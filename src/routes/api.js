const express = require("express");
const router = express.Router();
const UserAuthController = require('../controllers/UserAuthController')
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware");
const TasksController = require('../controllers/TaskController')

router.post('/Registration', UserAuthController.Registration)
router.post('/Login', UserAuthController.Login)
router.get('/ProfileDetails', AuthVerifyMiddleware, UserAuthController.ProfileDetails)
router.post('/ProfileUpdate', AuthVerifyMiddleware, UserAuthController.ProfileUpdate)
router.get("/RecoverVerifyEmail/:email",UserAuthController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",UserAuthController.RecoverVerifyOtp);
router.post("/RecoverResetPassword",UserAuthController.RecoverResetPassword);


router.post("/createTask",AuthVerifyMiddleware,TasksController.createTask);
router.get("/deleteTask/:id",AuthVerifyMiddleware,TasksController.deleteTask);


module.exports = router;