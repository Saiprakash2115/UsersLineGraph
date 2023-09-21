const mongoose = require("mongoose")

const productSchema = new mongoose.Schema( { 
    
        type: {
            type:String,
            require:true
        },
        name:{
            type:String,
            require:true
        },     
        email: {
            type:String,
            require:true
        },
        password: {
            type:String,
            require:true
        },
        contactNumber: {
            type:String,
            require:true
        },
    })

const usersData=mongoose.model("usersdata",productSchema)

module.exports = usersData;

