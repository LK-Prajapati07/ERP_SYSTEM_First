import mongoose from "mongoose";

const TeacherSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    employeeId:{
        type:String,
        required:true,
    },
    department:{
        type:String, 
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    subjectsHandled:{
        type:[String],
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    joiningDate:{
        type:Date,
        required:true
    },
    salary:Number,
    officeRoom:{
        type:Number
    },
    availableTimings:{
        type:[String]
    }
},
{
    timestamps:true
}
)
export const Teacher=mongoose.model("Teacher",TeacherSchema)