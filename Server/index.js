const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const registersData = require ("./registeredData");
const usersData = require("./usersformat");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require('./middleware');
const usersTime = require("./usersloginhistory");
const usersloginhistory = require("./usersloginhistory");
const { ObjectId } = require("mongodb");
// var ObjectID = require('mongodb').ObjectID;

const app = express()
app.use(express.json())//accepting json format data 
app.use(cors({origin:"*"}));

//mongodb connection//
const port=3003
 mongoose.connect("mongodb+srv://saiprakash2115:m1Yb7ZlsB0nVVGbY@cluster0.r19eo2o.mongodb.net/usersdashboard?retryWrites=true&w=majority").then((res)=>console.log("DB Connected")).catch((err)=>console.log(err.message))

 //initializing mongodb to node
.then(()=>console.log("DB Connected"))
.catch((e)=>console.log(e.message))

 //home API
app.get("/",(req,res)=>{
    res.send("Hello World")
})

//signup
app.post("/signup", async(req,res)=>{
    console.log(req.body)
    try{
     const {type,name,email,password,contactNumber} = req.body
 
     //checking user whether it is exist or not
     const isUserExist = await usersData.findOne({ "$or": [ { email: email }, { contactNumber: contactNumber} ] }); 
     if (isUserExist){
        return res.send({msg:"User Already Registered",status:"failed"})
     }
      else{
         const hashedPassword = await bcrypt.hash(password, 10);//generating encrypted password for user 
         let newUser = new usersData({
             type,
             name,
             email,
             password,
             contactNumber      
            }) 
     newUser.save();//saving mongodb collection
     return res.send({msg:"User Created Successfully",status:"success"});
    } 
    }catch(e){
     console.log(e.message)
     res.send("Internet Server Error")
    }
 })

//Login API
app.post("/login",async(req,res)=>{

    const {userId,signinTime,signoutTime,email, password} = req.body
    const isUserExist = await usersData.findOne({email: email});//email
    const isUser = await usersloginhistory.findOne({userId:userId});
    
    if(!isUserExist) return res.send({msg:"User need tobe Registered",status:"failed"})
    
    const isValidCreds = await usersData.findOne({ "$and": [ { email: email }, { password: password} ]});
    if(!isValidCreds){
        return res.send({msg:"Password Not Matched",status:"failed"})
    }  
    
    let payload ={
        user: isUserExist.id
    }
    var newUser = await usersloginhistory({
        userId : isUserExist.id,
        signinTime : new Date().getTime(), 
        // signoutTime : new Date().getTime()     
       }).save()
    console.log(newUser);
    jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token)=>{
            if(err) throw err
            return res.send({msg:"User Login Successfull",status:"success",token:token,type:isUserExist.type,userLoginId:newUser.userId, userLoginTime:newUser.signinTime,docId:newUser._id})      
    })    
})

//get my profile api
app.get("/myprofile",middleware,async(req,res)=>{
    try{
        const token = jwt.decode(req.headers['x-token']);
        const loggedUser = await usersData.findById(token.user);
        res.json(loggedUser)
    }catch(e){
        console.log(e)
        return res.send("Internal server error")
    }
})

//get all users API
app.get("/allusers",async(req,res)=>{
    const allUsers = await usersData.find({})
    // console.log(allUsers);
    res.status(200).send(allUsers)
})
//get individual profile
app.post("/individualuser",async(req,res)=>{
    const {id,SDate,EDate} = req.body
    console.log(id,SDate,EDate)
    // const individualUser= await usersloginhistory.find({userId:id}).sort({"signoutTime":-1});
    const individualUsernew= await usersloginhistory.find({$and:[{signinTime:{$gte:SDate}},{signoutTime:{$lte:EDate}},{userId:id}]}).sort({"signoutTime":-1});
    console.log(individualUsernew)
    res.status(200).send(individualUsernew)
  })

  app.post("/logout",async(req,res)=>{
    // const {userId,signinTime,signoutTime} = req.body
    // const individualLoginUser= await usersloginhistory.findOne({ "$and": [ { userId: userId }, { signinTime: signinTime} ]});
    const {docId} = req.body
    const individualLoginUser= await usersloginhistory.findOne({ "_id": docId});
    console.log("user",individualLoginUser);
    // return
    var userLogout = await usersloginhistory.updateOne(
        // { userId: userId ,signinTime: signinTime},
        {"_id":  docId}, 
        {$set:{signoutTime:new Date().getTime()}},
        // {upsert : true}
        )
    console.log(userLogout);
    // res.status(200).send(individualLoginUser,{signoutTimeLatest:userLogout.signoutTime})
    res.status(200).send(true)
  })


app.listen(3003,()=>{
    console.log("Server running at 3003")
})
