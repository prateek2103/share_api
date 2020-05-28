const mongoose=require('mongoose')
const model=require("./models/model")
const db=require('./db')
const projectModel=model["project"]
const employeeModel=model["employee"]
const companyModel=model["company"]
const shareRoutes=require("./routes/share")
const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const userRoutes=require("./routes/user")

db()
app.use(bodyParser.json())
app.use("/api",shareRoutes)
app.use('/user',userRoutes)

// let company=new companyModel({
//     _id:mongoose.Types.ObjectId(),
//     name:"New company"
// })

// company.save(function(err,data){
//     if(err)
//         console.log(err)
//     else{
//         let employee=new employeeModel({_id:mongoose.Types.ObjectId(),name:"prateek",company:data._id})
//         employee.save(function(err){
//             if(err)
//                 console.log(err)
//         })
//     }
// })
app.listen(3000)
