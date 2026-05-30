import mongoose from "mongoose";


const AttendanceSchema = new mongoose.Schema({
    StudentId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required:true
    },
    SubjectId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject',
        required:true,

    },
    teacherId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    attendanceStatus:{
        type:String,
        enum:['P','A','AB','M'],
        required:true
    },
    lectureNumber:{
        type:Number,
        required:true
    }

},
{
    timestamps:true
}

)
export const Attendance=mongoose.model('Attendance',AttendanceSchema)