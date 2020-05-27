const express=require("express")
const app=express()
const employeeModel=require("../models/model")["employee"]
const companyModel=require("../models/model")['company']
const projectModel=require('../models/model')['project']
const mailsender=require("../utils/mail")

//add a new user or employee
app.post("/createEmployee",(req,res)=>{
    let emp=req.body

    //check if the company already exists
    companyModel.findOne({name:emp.company},function(err,data){
        if(err)
            console.log(err)
        else if(data){
            emp.company=data._id.toString()    //if already exist then assigning its id to employee table's company
            console.log("already",emp.company)
        }
        else{
            //if doesn't then creating a new company and assigning its id to employee table's company
            new companyModel({name:emp.company}).save(function(err,data){
                if(err)
                    console.log(err)
                emp.company=data._id.toString()
                console.log(emp.company)
            })
        }

        //creating the employee after checking company
        new employeeModel(emp).save(emp,function(err){
            if(err)
                console.log(err)
        })
    })
})


//create a new project
app.post("/addProject/:id",(req,res)=>{
    let project=req.body
    project.creator=req.params.id //adding the creator field

    projectModel(project).save(function(err,data){
        if(err)
            console.log(err)
        else{

            //updating employee projects details
            employeeModel.updateOne({_id:req.params.id},{$push:{projects:data._id.toString()}},function(err){
                if(err)
                    console.log(err)
            })
        }
    })
})

//sharing a project 
app.post("/shareProject/:projectId/:empId",(req,res)=>{
    let creator_company=""
    const emails=req.body  //requested emails
    const validEmails=[]   //validated emails

    //retrieving the creator's company
    employeeModel.findById(req.params.empId,function(err,data){
        if(err)
            console.log(err)
        else
            creator_company=data.company.toString()
    })
 
    //retrieving info about all emails
    employeeModel.find({email:{$in:emails.map(ele=>ele.user)}},function(err,data){
        if(err)
            console.log(err)
        else if(data){
            data.forEach(emp=>{
                //checking if both works in the same company
                if(emp.company.toString()==creator_company)
                    validEmails.push({"email":emp.email,"user":emp._id,
                        "access":emails.filter(ele=>ele.user==emp.email).map(ele=>ele.access)[0]
                    })
            })
        }
    }).then(function(){
            console.log(validEmails)
            mailsender("prateek007.purohit@gmail.com","anotfytgsjtcmhmk",validEmails.map(ele=>ele.email),"project link")
            //updating the users of the project
            projectModel.findByIdAndUpdate(req.params.projectId,
                                {$push:{users:{$each:validEmails}}},function(err){
                                    if(err)
                                        console.log(err)
                                })
    })
})

    
module.exports=app