const mongoose=require('mongoose')
const Schema=mongoose.Schema

//registration model
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    employeeId:{
        type:Schema.Types.ObjectId,
        ref:"Employee"
    }
})

//company model
const companySchema=new Schema({
    _id:Schema.Types.ObjectId,
    name:{
        type:String,
        unique:true,
        required:true
    },

    employees:[{
        type:Schema.Types.ObjectId,
        ref:"Employee"
    }]
})

//employee model
const employeeSchema=new Schema({
    _id:Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    company:{
        type:Schema.Types.ObjectId,
        ref:"Company"
    },
    phone:{
        type:Number,
        required:true
    },
    projects:[{
        type:Schema.Types.ObjectId,
        ref:"Project"
    }]
})

//project model
const projectSchema=new Schema({
    _id:Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    users:[{
        user:{type:Schema.Types.ObjectId,ref:"Employee"},
        access:{type:Array,default:[]}
    }]
})

const Company=mongoose.model("Company",companySchema,"Company")
const Employee=mongoose.model("Employee",employeeSchema,"Employee")
const Project=mongoose.model("Project",projectSchema,"Project")
const User=mongoose.model("User",userSchema,"User")

module.exports={"company":Company,"employee":Employee,"project":Project,"user":User}