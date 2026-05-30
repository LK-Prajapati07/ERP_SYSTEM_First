import mongoose from "mongoose";

const AssignmentSchema=new mongoose.Schema({
    assignmentTitle:{
        type:String,
        required:true
    },
    subjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:true
    },
    description:{
        type:String,
        required:true
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
        required:true
    },
    Document_url:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    totalMark:{
        type:Number,
        required:true
    },
    instruction:{
        type:String
    },
    assignmentType:{
        type:String,
        enum:['HomeWork','LabWork','Project','Quiz'],
        default:'HomeWork',
        required:true
    },

},
{timestamps:true}
)
export const Assignment=mongoose.model('Assignment',AssignmentSchema)