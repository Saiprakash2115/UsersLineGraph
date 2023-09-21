const mongoose = require("mongoose")

const productSchema = new mongoose.Schema( { 
    
        userId: {
            type:String,
            require:true
        },
        signinTime:{
            type:String,
            require:true
        },
        signoutTime:{
            type:String,
            require:true
        }
    })

const usersloginhistory= mongoose.model("usersloginhistory",productSchema)

module.exports = usersloginhistory;

