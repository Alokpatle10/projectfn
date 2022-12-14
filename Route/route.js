const express=require('express')
const router=express.Router()

const { addMarks, getRecords, editRecord, deleteRecord }=require("../Controller/studentController")
const{userRegistration,userLogin}=require("../Controller/userController")
const{authentication}=require("../Middleware/auth")

router.get("/testme",(req,res)=>{
    res.status(200).send({status:true, msg:"Ok good to go"})
})
//<------------------------------------------------------------------------------------------------------------------->
router.post("/register",userRegistration)
router.post("/login",userLogin)
//<------------------------------------------------------------------------------------------------------------------->
router.post("/add",authentication,addMarks)
router.get("/getRecords",authentication,getRecords)
router.put("/edit",authentication,editRecord)
router.delete("/delete",authentication,deleteRecord)
//<------------------------------------------------------------------------------------------------------------------->
module.exports=router