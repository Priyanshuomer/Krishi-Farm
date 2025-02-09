const express = require("express");
const userModel= require("../models/user.js");
const nodemailer = require("nodemailer");
const {getUserByToken} = require("../middlewares/token.js");

process.env.config();


const route = express.Router();

let generatedOTP = null;


route.get("/", (req,res) => {
    res.render("home-Page");
})


route.get("/generate-otp" , async (req,res) => {
    const {email , errorMsg , password , full_name , aadhar , mobile } = req.query;

    if(!email)
    {
        let errorMsg = "Email is required for sending OTP";
         res.redirect(`/user/sign-up?errorMsg=${errorMsg}`);
    }

    // Generate a 6-digit OTP
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'testapplication2710@gmail.com', // Your email
                pass: process.env.PASS_KEY
            }
        });


        const mailOptions = {
            from: 'testapplication2710@gmail.com',
            to: email ,
            subject: 'Email Verification Code',
            text: `Your OTP code is: ${generatedOTP} for verifying your account on Agri-Farm web application . `
        };

        try {
            await transporter.sendMail(mailOptions);
            // console.log("OTP sent successfully");
            //  return 1;
            //  res.json({ message: `OTP sent to ${email}` });
        } catch (error) {
            //  console.log("OTP Gen error ",error);
            let errorMsg = "Invalid Email.....";
            // res.status(500).json({ error: "Failed to send OTP" });
            return res.redirect(`/user/sign-up?errorMsg=${errorMsg}`)
        }
                    
   // console.log("pass get on OTP")
     res.render("otp-verification-Page" , {email , errorMsg , password , full_name , aadhar , mobile});
});

route.post("/generate-otp", async (req, res) => {

 const {otp} = req.body;

 const {email , password , full_name , aadhar , mobile , errorMsg} = req.query;

 if(otp == generatedOTP)
 {
    console.log("Email verified");

    await userModel.create({
      email , 
      password , 
      full_name ,
       aadhar , 
       mobile
    });



    return res.redirect("/user/login");
 }  
 else
 {
    console.log("Invalid OTP , Please try again.....");
    const error = "Invalid Code , please try again.....";
    return res.redirect(`/user/generate-otp?error=${error}&email=${email}&mobile=${mobile}&password=${password}&full_name=${full_name}&aadhar=${aadhar}&errorMsg=${errorMsg}`);
 }

});

route.get("/sign-up",(req,res) => {
    const {errorMsg} = req.query;
    console.log(errorMsg);
    res.render("sign-up-Page" , {errorMsg});
});

route.post("/sign-up", async (req,res) => {
    //    return res.end("hello");

    const {email,password,full_name,aadhar, mobile , errorMsg} = req.body;
     console.log(email,password,full_name,aadhar,mobile);
    if(!email || !password || !aadhar || !full_name || !mobile)
     {
        let error = "Fields are required";
        return res.redirect(`/user/sign-up?errorMsg=${error}`);
     }

         let user = await userModel.findOne({email : email});

         if(user)
         {
            let error = "Email already Exists";
            console.log(error);
            return res.redirect(`user/sign-up?errorMsg=${encodeURIComponent(error)}`)
         }

         user = await userModel.findOne({mobile : mobile});

         if(user)
         {
            let error = "Mobile Number already Exists";
            console.log(error);
            return res.redirect(`user/sign-up?errorMsg=${encodeURIComponent(error)}`)
         }

         user = await userModel.findOne({aadhar : aadhar});

         if(user)
         {
            let error = "Aadhar Number already exists already Exists";
            console.log(error);
            return res.redirect(`user/sign-up?errorMsg=${encodeURIComponent(error)}`)
         }

        return res.redirect(`/user/generate-otp?email=${email}&mobile=${mobile}&password=${password}&full_name=${full_name}&aadhar=${aadhar}&errorMsg=${errorMsg}`);
                                                                                 
});


route.get("/login",(req,res) => {
    const {errorMsg} = req.query;
    res.render("login-Page.ejs" , {errorMsg});
});


route.post("/login",async (req,res) => {
    const {errorMsg} = req.query;
    const {mobile,password} = req.body;
   try{
    const token = await userModel.matchPasswordAndGenerateToken(mobile,password);
    if(!token)
    {
        let errorMsg = "There is some issue in logging , please try again...."
        return res.redirect(`/user/login?errorMsg=${encodeURIComponent(errorMsg)}`);
    }

      const user = getUserByToken(token);
        req.user = user;
        const User = await userModel.findById(user._id);
        req.dataUser = User;
        console.log(User);


        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'testapplication2710@gmail.com', // Your email
                pass: process.env.PASS_KEY 
            }
        });
    
        const mailOptions = {
            from: 'testapplication2710@gmail.com',
            to: User.email,
            subject: 'Email Verification Code',
            text: `You have recently login in our web application Dhan-Rashi`
        };
    
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Email send failed", error);
        }



     return res.cookie("uid",token).redirect(`/user/${req.user._id}?user=${encodeURIComponent(req.dataUser)}&errorMsg=${errorMsg}`);
   }
   catch(error){
   console.log("ERROR in login");
    console.log(error);
    let errorMsg = "There is some issue in logging , please try again...."
    return res.redirect(`/user/login?error:${errorMsg}`);
    }
});

route.get("/:id",async (req,res) => {
    console.log(req.user);
    const {errorMsg} = req.query;
   const User = await userModel.findById(req.user?._id);
    res.render("home-Page.ejs" , {user:User , errorMsg});
});





route.get("/about/:id",async (req,res) => {
    const User = await userModel.findById(req.user._id);
    const {errorMsg} = req.query;
    res.render("user-about.ejs" , {user:User , errorMsg});
});


module.exports = {route};