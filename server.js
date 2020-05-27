const mongoose=require('mongoose')
const model=require("./models/model")
const db=require('./db')
const projectModel=model["project"]
const employeeModel=model["employee"]
const companyModel=model["company"]

db()

let company=new companyModel({
    _id:mongoose.Types.ObjectId(),
    name:"New company"
})

company.save(function(err,data){
    if(err)
        console.log(err)
    else{
        let employee=new employeeModel({_id:mongoose.Types.ObjectId(),name:"prateek",company:data._id})
        employee.save(function(err){
            if(err)
                console.log(err)
        })
    }
})
