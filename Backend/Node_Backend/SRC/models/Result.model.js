import mongoose from "mongoose";

const ResultSchema=new mongoose.Schema({
    StudentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    SubjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:true 
    },
    examType:
    {
        type:String,
        enum:['mid','final','Quiz','Assignment','Practical'],
        default:'mid',
        required:true
    },
    marksObtained:{
        type:Number,
        required:true
    },
    totalMarks:{
        type:Number,
        required:true
    },
    percentage:{
        type:Number,
        required:true
    },
    grade:{
        type:String,
        required:true
    },
    remarks:{
        type:String
    },
    semester:{
        type:Number,
        required:true
    },
    examDate:{
        type:Date,
        required:true
    },

},
{
    timestamps:true
}
)
export const Result=mongoose.model('Result',ResultSchema)