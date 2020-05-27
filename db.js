const mongoose=require('mongoose')
const url="mongodb://localhost/share"

function db(){
    mongoose.connect(url,(err)=>{
    if(err)
        console.log(err)
    else
        console.log("connected to database")
    })
}

module.exports=db