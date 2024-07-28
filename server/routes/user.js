import express from 'express';
import {User} from '../models/user.js';
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const router=express.Router();

const Admin=process.env.EMAIL;
const Password = process.env.PASSKEY

router.post('/signup',async (req,res)=>{
    
    const {username,email,password}=req.body;
    const user=await User.findOne({email})
    if(user){
        return res.json({message:"user already exist"});
    }
    const hashpassword=await bcrypt.hash(password,10);
    const newUser=new User({
        username,
        email,
        password:hashpassword
    });

    await newUser.save();
    return res.json({status:true,message:"Record Registered"})
})

router.post('/login',async (req,res)=>{

    const { email, password }=req.body;
    const user=await User.findOne({email});

    if(!user){
        return res.json({message:"user is not registered"});
    }
    const validPassword=await bcrypt.compare(password,user.password);
    if (!validPassword) {
        return res.json({ message: "password is incorrect" });
    }
    const token=await jwt.sign({username:user.username},process.env.KEY,{expiresIn:'1h'});

    res.cookie("token",token,{httpOnly:true,maxAge:360000})
   
    return res.json({status:true,message:user})
})

router.post('/forgot-password',async (req,res)=>{
    const { email }= req.body;
    try{
        const user=await User.findOne({email});

        if(!user){
            return res.json({message:"user not registered"});
        }
        const token=await jwt.sign({ id: user._id},process.env.KEY,{
            expiresIn:'5m'
        });

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: Admin,
              pass: Password,
            }
        }); 

        const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
        var mailOptions = {
            from: Admin,
            to: email,
            subject: "Reset Password",
            text: `http://localhost:5173/resetPassword/${encodedToken}`,
        };
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: "error sending email" });
            } else {
                return res.json({ status: true, message: "email sent to your account" });
            }
        });
    }catch(err){
        console.log(err)
    }
});

router.post('/reset-password/:token',async (req,res)=>{
    const {token}=req.params;
    const {password}=req.body;

    try{
        const decoded=await jwt.verify(token,process.env.KEY);
        const id= decoded.id;
        const hashpassword=await bcrypt.hash(password,10);
        await User.findByIdAndUpdate({_id:id},{password:hashpassword});
        return res.json({status:true,message:"updated password"})
    }catch(err){
        return res.json("invalid token")
    }

})

const verifyUser = async (req, res, next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.json("no token");
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        next();
    }
    catch(err){
        console.log(err)
    }
}

router.get( '/verify', verifyUser, async (req,res)=>{
    return res.json({status:true,message : "authorized"})
});


router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({status:true})
});
export {router as UserRouter}