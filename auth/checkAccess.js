const projectModel=require('../models/model')['project']
const jwt=require('jsonwebtoken')

const checkAccess = (req,res,next) => {
    jwt.verify(req.token['token'], 'private_key', (err, authorizedData) => {
        if (err) {
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
           let user=authorizedData["_doc"]
            projectModel.findById(req.token['proId'],function(err,data){
                if(err)
                    res.send(err)
                else{
                    isUser=data.users.filter(ele=>ele.user==user._id)[0]
                    if(isUser){
                        req.user={user:user,access:isUser["access"]}
                        next()
                    }
                    else   
                        res.sendStatus(403)
                }
            })
        }
    })
}

module.exports=checkAccess