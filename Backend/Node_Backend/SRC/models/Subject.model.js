import mongoose from "mongoose";

const SubjectSchema=mongoose.Schema({
    subjectName:{
        type:String,
        required:true 
    }, 
    subjectCode:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    credit:{
        type:Number,
        min:1,
        max:3,
        required:true
    },
    teacherAssigned:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
        required:true
        
    },
    syllabus:{
        type:[String],
        required:true
    },
    subjectDescription:{
        type:String,
        required:true
    },
    totalLecture:{
        type:Number,
        required:true
    },
    subjectType:{
        type:String,
        enum:["Theory","Practical",'Lab'],
        default:"Theory"
    }
},
{timestamps:true}
)
export const Subject=mongoose.model("Subject",SubjectSchema)