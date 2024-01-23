// ignore this file


// const ProductModel = require("../models/UserModel");

// exports.CreateProduct=async(req,res)=>{

//     try{
//         let reqBody = req.body;
//         let result = await ProductModel.create(reqBody);
//         res.status(200).json({status: "success", data: result});
        
//     }catch(e){
//         res.status(200).json({status: "fail", data: "Something went wrong"});

//     }

// }

// exports.ReadProduct=async(req,res)=>{

//     try{
//         let result = await ProductModel.find();
//         res.status(200).json({status: "success", data: result});
        
//     }catch(e){
//         res.status(200).json({status: "fail", data: "Something went wrong"});

//     }

// }

// exports.ReadProductById=async(req,res)=>{

//     try{
//         let id = req.params.id;
//         let result = await ProductModel.find({_id: id});
//         res.status(200).json({status: "success", data: result});
        
//     }catch(e){
//         res.status(200).json({status: "fail", data: "Something went wrong"});

//     }

// }

// exports.DeleteProduct=async(req,res)=>{

//     try{
//         let id = req.params.id;
//         let result = await ProductModel.deleteOne({_id: id});
//         res.status(200).json({status: "success", data: result});
        
//     }catch(e){
//         res.status(200).json({status: "fail", data: "Something went wrong"});

//     }

// }

// exports.UpdateProduct=async(req,res)=>{

//     try{
//         let id = req.params.id;
//         let reqBody = req.body;
//         let result = await ProductModel.updateOne({_id: id},reqBody);
//         res.status(200).json({status: "success", data: result});
        
//     }catch(e){
//         res.status(200).json({status: "fail", data: "Something went wrong"});

//     }

// }