const mongoose=require('mongoose')
const Schema=mongoose.Schema

//company model
const companySchema=new Schema({
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
    name:{
        type:String,
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
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    projects:[{
        type:Schema.Types.ObjectId,
        ref:"Project"
    }]
})

//project model
const projectSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    creator:{type:Schema.Types.ObjectId,ref:"Employee"},
    users:[{
        user:{type:Schema.Types.ObjectId,ref:"Employee",unique:true},
        access:{type:Array,default:['read','write','update','delete']},
    }]
})

const Company=mongoose.model("Company",companySchema,"Company")
const Employee=mongoose.model("Employee",employeeSchema,"Employee")
const Project=mongoose.model("Project",projectSchema,"Project")

module.exports={"company":Company,"employee":Employee,"project":Project}