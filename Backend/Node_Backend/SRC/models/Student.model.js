import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    enrollmentNumber:{
        type:String,
        required:true,
        unique:true
    },
    rollNo:{
        type:Number,
        required:true
    },
    semester:{ 
        type:Number,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    addmisionId:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    batchYear:{
        type:Number,
        required:true
    },
    guardianName:{
        type:String,
        required:true
    },
    guardianContact:{
        type:Number,
        required:true
    },
    attendencePercentage:{
        type:Number,
        required:true
    },
    currentCGPA:{
        type:Number,
        required:true
    }


},
{ timestamps: true }
)
export const Student = mongoose.model("Student", studentSchema);