const mongoose=require('mongoose')
const Schema=mongoose.Schema

const companySchema=new Schema({
    _id:Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },

    employees:[{
        type:Schema.Types.ObjectId,
        ref:"Employee"
    }]
})

const employeeSchema=new Schema({
    _id:Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    company:{
        type:Schema.Types.ObjectId,
        ref:"Company"
    },
    projects:[{
        type:Schema.Types.ObjectId,
        ref:"Project"
    }]
})

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
        access:{type:Array,default:["read"]}
    }]
})

const Company=mongoose.model("Company",companySchema,"Company")
const Employee=mongoose.model("Employee",employeeSchema,"Employee")
const Project=mongoose.model("Project",projectSchema,"Project")

module.exports={"company":Company,"employee":Employee,"project":Project}