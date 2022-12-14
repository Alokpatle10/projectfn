const studentModel = require("../Model/student")
const { updateOne } = require("../Model/student")

const subjects = ["Biology", "Zoology", "Mathematics", "Physics", "Chemistry"]
const addMarks = async function (req, res) {
    try {
        const { fullName, marks, subject } = req.body
        const userId = req.token.userId

        if (!fullName || !marks || !subject) {
            return res.status(400).send({ status: false, message: "Please provide fullName,marks and subject" })
        }

        if (!subjects.includes(subject)) {
            return res.status(400).send({ status: false, message: "Subjects can be Biology, Zoology, Mathematics, Physics, Chemistry only" })
        }

        const updatedata = await studentModel.findOneAndUpdate({"userId": userId, "fullName": fullName, "subject": subject, "isDeleted": false},
            { $inc: { "marks": marks } },
            { new: true })

        if (updatedata) {
            return res.status(200).send({ status: true, message: "Data updated", data: updatedata })
        }

        const createdata = await studentModel.create({ fullName, marks, subject, userId })
        return res.status(201).send({ status: true, message: "Record created", data: createdata })

    } catch (err) {
        return res.status(500).send({ status: false, error: err.msg })
    }
}

const getRecords = async function (req, res) {
    try {
        const userId = req.token.userId
        const getData = await studentModel.find({ "userId": userId ,"isDeleted": false })
        if (getData.length == 0) {
            return res.status(404).send({ status: false, message: "No records found" })
        }
        return res.status(200).send({ status: true, count:getdata.length, data: getData })
    } catch (err) {
        return res.status(500).send({ status: false, error: err.msg })
    }
}

const editRecord = async function (req, res) {
    try {
        const userId = req.token.userId
        const { fullName, marks, subject } = req.body
        if (!fullName || !marks || !subject) {
            return res.status(400).send({ status: false, message: "Please provide fullName,marks and subject" })
        }
        const fetchData=await studentModel.findOne({"userId": userId, "fullName": fullName, "subject": subject, "isDeleted": false })

        if(!fetchData){
            return res.status(404).send({status:false, message:"No record found with this details"})
        }
        
        const editData = await studentModel.findOneAndUpdate(
            { "userId": userId, "fullName": fullName, "subject": subject, "isDeleted": false },
            { $set: { fullName, marks, subject } },
            {new:true}
        )
        if (!editData) {
            return res.status(404).send({ status: false, message: "No record found with this details" })
        }
        if(editData.marks==marks){
            return res.status(200).send({ status: true, message: "No updation found" }) 
        }
        return res.status(200).send({ status: true, message: "Record updated successfully",data:editData })

    } catch (err) {
        return res.status(500).send({ status: false, error: err.msg })
    }
}

const deleteRecord = async function (req, res) {
    try {
        const userId = req.token.userId
        const { fullName, subject } = req.body
        const deleteData = await studentModel.findOneAndUpdate(
            { "userId": userId, "fullName": fullName, "subject": subject, "isDeleted": false },
            { $set: { isDeleted: true, deletedAt: Date.now() } }
        )
        if (!deleteData) {
            return res.status(404).send({ status: false, message: "No record found with this details" })
        }
        return res.status(200).send({ status: true, message: "Record deleted successfully" })

    } catch (err) {
        return res.status(500).send({ status: false, error: err.msg })
    }
}

module.exports = { addMarks, getRecords, editRecord, deleteRecord }