const express = require("express")
const app = express()
const employeeModel = require("../models/model")["employee"]
const companyModel = require("../models/model")['company']
const projectModel = require('../models/model')['project']
const mailsender = require("../utils/mail")

//create a new project
app.post("/addProject/:id", (req, res) => {
    let project = req.body
    project.creator = req.params.id //adding the creator field

    projectModel(project).save(function (err, data) {
        if (err)
            res.send(err)
        else {

            //updating employee projects details
            employeeModel.updateOne({ _id: req.params.id }, { $push: { projects: data._id.toString() } }, function (err) {
                if (err)
                    res.send(err)
                else
                    res.send("successfully added project")
            })
        }
    })
})

//sharing a project 
app.post("/shareProject/:projectId/:empId", (req, res) => {
    let creator_company = ""
    const emails = req.body  //requested emails
    const validEmails = []   //validated emails

    //retrieving the creator's company
    employeeModel.findById(req.params.empId, function (err, data) {
        if (err)
            res.send(err)
        else
            creator_company = data.company.toString()
    }).then(function () {
        //retrieving info about all emails
        employeeModel.find({ email: { $in: emails.map(ele => ele.user) } }, function (err, data) {
            if (err)
                res.send(err)
            else if (data) {
                data.forEach(emp => {
                    //checking if both works in the same company
                    if (emp.company.toString() == creator_company)
                        validEmails.push({
                            "email": emp.email, "user": emp._id,
                            "access": emails.filter(ele => ele.user == emp.email).map(ele => ele.access)[0]
                        })
                })
            }
        }).then(function () {
            let projectLink=`localhost:3000/user/protectedPage/${req.params.projectId}`
            mailsender("prateek007.purohit@gmail.com", "anotfytgsjtcmhmk", validEmails.map(ele => ele.email), projectLink)
            //updating the users of the project
            projectModel.findByIdAndUpdate(req.params.projectId,
                { $push: { users: { $each: validEmails } } }, function (err) {
                    if (err)
                        res.send(err)
                    else
                        res.send('successfully shared')
                })
        })
    })
})


module.exports = app