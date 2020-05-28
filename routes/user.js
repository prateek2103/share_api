const express=require("express")
const app=express()
const model=require("../models/model")
const companyModel=model['company']
const employeeModel=model['employee']
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const checkToken=require("../auth/checkToken")
const checkAccess=require("../auth/checkAccess")

//register user
app.post('/register',(req,res)=>{
    let emp=req.body

    //check if the company already exists
    companyModel.findOne({name:emp.company},function(err,data){
        if(err)
            res.status(500).send(err)

        else if(data){
            emp.company=data._id.toString()    //if already exist then assigning its id to employee table's company
            new employeeModel(emp).save(function(err){
                if(err)
                    res.status(500).send(err)
                else
                    res.redirect('/user/login')
            })
        }
        else{
            //if doesn't then creating a new company and assigning its id to employee table's company
           new companyModel({name:emp.company}).save(function(err,data){
                if(err)
                    res.status(500).send(err)
                else {
                    emp.company=data._id.toString()
                    new employeeModel(emp).save(function(err){
                        if(err)
                            res.status(500).send(err)
                        else
                            res.redirect('/user/login')
                    })
                }
            })
        }
    })
})

//login
app.post('/login',(req,res)=>{
    const {email,password}=req.body
    if (!email || !password)
    return res.status(401).send({ msg: "Email or Password not provided!" });

    employeeModel.findOne({email:email},async function(err,data){
        if(err)
            res.status(500).send({msg: "An error occured"})
        
        else if(data){
            let result=await bcrypt.compare(password,data.password)
            if(result){
                jwt.sign({ ...data }, 'private_key',{ expiresIn: '1h' },function(err,token){
                    if(err)
                        res.status(500).send({msg:"An error occured"})
                    else
                        res.send({token:token})
                })
                
            }
        }
        else{
            res.status(401).send({msg:"Incorrect credentials"})
        }
    })
})

app.get("/protectedPage/:id",checkToken,checkAccess,(req,res)=>{
   res.send(req.user)
})

module.exports=app