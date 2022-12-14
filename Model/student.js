const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'User' },
    fullName: { type: String, required: true},
    marks: { type: Number, required: true },
    subject: { type: String, required: true, enum: ["Biology", "Zoology", "Mathematics", "Physics", "Chemistry"] },
    isDeleted:{type:Boolean,default:false},
    deletedAt:{type:Date, default:undefined}
}, { timestamps: true })

module.exports = mongoose.model('Student', studentSchema)