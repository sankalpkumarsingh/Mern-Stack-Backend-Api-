const jwt = require('jsonwebtoken')


module.exports=function verifyToken( req,res,next)
{
    let tokenData=req.headers['authorization']
    
    if(tokenData!=undefined)
    {
        let token= tokenData.split(" ")[1]

        jwt.verify( token,"mykey", (err,userdetails)=>{
            if(err==null)
            {
                req.user=userdetails
                next();
                
            }   
        else{
            res.status(403)
            res.send({ "message": "wrong token" })
        }
        
        })
        
         
    }
    else
    {
        res.status(403)
        res.send({"meaasage":"no token available"})
    }

}
