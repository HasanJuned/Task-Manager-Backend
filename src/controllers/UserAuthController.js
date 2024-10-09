const UserModel = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const OtpModel = require("../models/OtpModel")
const TaskModel = require("../models/TaskModel")
const SendEmailUtility = require("../utility/SendEmailUtility");

exports.Registration=async (req,res)=>{

    let reqBody = req.body;
    try{
        let result = await UserModel.create(reqBody);
        res.status(200).json({status: "success", data: result})

    }catch(e){
        res.status(400).json({status: "fail", data: e.message})
    }

}

exports.Login=async (req,res)=>{

    let reqBody = req.body;


    try{
        let result = await UserModel.find(reqBody).count();
        if(result===1){
            let Payload = {
                exp:Math.floor(Date.now()/1000)+(24*60*60),
                data: reqBody['email']
            }

            let userDetails = await result;

            let token = jwt.sign(Payload, 'SecretKey123456789');
            res.status(200).json({status: "success", data: userDetails, token: token})


        }else{
            res.status(404).json({status: "fail", data: "No user found. Try again!"})
        }
        
    }catch(e){
        res.status(200).json({status: "fail", data: e.message})
    }

}


exports.ProfileDetails = async (req, res) => {
    try {
      let email = req.headers['email'];
      let result = await UserModel.find({ email: email });
      res.status(200).json({ status: 'success', data: result });
    } catch (e) {
      console.error(e);
      return res.status(404).json({ status: 'fail', data: e.message });
    }
  };

  exports.ProfileUpdate = async (req, res) => {
    try {
      let email = req.headers['email'];
      let reqBody = req.body;
      let result = await UserModel.updateOne({ email: email }, reqBody);
      res.status(200).json({ status: 'success', data: result });
    } catch (e) {
      console.error(e);
      return res.status(404).json({ status: 'fail', data: e.message });
    }
  };

  exports.RecoverVerifyEmail= async(req,res)=>{

    let email = req.params.email;
    let OtpCode = Math.floor(100000 + Math.random() * 900000)
    let EmailText = "Your Verification Code is: "+OtpCode;
    let EmailSubject = "Task Manager Verification Code"

    let result = await UserModel.find({email:email}).count();

    if(result===1){
        await SendEmailUtility(email, EmailText, EmailSubject);
        let result = await OtpModel.create({email:email, otp: OtpCode})
        res.status(200).json({status: "success", data: "A 6 digit OTP code sent to your email"})


    }else{
        res.status(404).json({status: "fail", data: "No user found. Try again!"})
    }

  }

  exports.RecoverVerifyOtp=async(req,res)=>{
    let email = req.params.email;
    let OtpCode = req.params.otp
    let status = 0;
    let updateStatus = 1;

    let result = await OtpModel.find({email:email, otp: OtpCode, status:status}).count();

    if(result===1){

        let result = await OtpModel.updateOne({email:email, otp: OtpCode, status:status}, {status:updateStatus});
        res.status(200).json({status: "success", data: "Otp Verified"})


    }else{
        res.status(406).json({status: "fail", data: "Invalid Otp"})
    }

  }
  
  exports.RecoverResetPassword=async(req,res)=>{
    let email = req.body['email'];
    let OtpCode = req.body['OTP'];
    let newPass = req.body['password']
    let updateStatus = 1;

    let result = await OtpModel.find({email:email, otp: OtpCode, status:updateStatus}).count();

    if(result===1){

        let result = await UserModel.updateOne({email:email}, {password: newPass});
        res.status(200).json({status: "success", data: "Password Reset Success"})


    }else{
        res.status(406).json({status: "fail", data: "Password reset failed"})
    }

  }