const mongoose=require('mongoose')
const url="mongodb://localhost/share"

function db(){
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false }, (err)=>{
    if(err)
        console.log(err)
    else
        console.log("connected to database")
    })
}

module.exports=db