const jwt = require ("jsonwebtoken");

module.exports = function(req,res,next){
    try{
     let token = req.header("x-token");
     console.log(token)
     if(!token){
        return res.status(400).send("JWT Token Not Found")
     }
     let compareJwt  =jwt.verify(token, "jwtPassword");
     req.user = compareJwt.user;// comparing requser and logged in user

     next();
    }catch(e){
        console.log(e)
        return res.status(500).send("Internet server Error")
    }
}