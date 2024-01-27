const TasksModel = require("../models/TaskModel")

exports.createTask=async(req,res)=>{

    try{
        let reqBody = req.body;
        reqBody.email = req.headers['email'];

        let result = await TasksModel.create(reqBody)
        res.status(200).json({ status: 'success', data: result });

    }catch(e){
        res.status(200).json({ status: 'fail', data: 'Internal Server Error' });
    }



}

exports.deleteTask=async(req,res)=>{
    try{

        let id = req.params.id;
        let deleteTask = {_id:id}

        let result = await TasksModel.deleteOne(deleteTask)
        res.status(200).json({ status: 'success', data: result });

    }catch(e){
        res.status(200).json({ status: 'fail', data: 'Internal Server Error' });

    }



}