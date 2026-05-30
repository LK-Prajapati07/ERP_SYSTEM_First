import mongoose from "mongoose";

const CheatingSchema=new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true
    },
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Quiz',
        required:true
    },
    eventType:{
        type:String,
        enum:['TAB_SWITCH','MULTIPLE_FACE','NO_FACE','COPY_PASTE','FULLSCREEN_EXIT','DEVTOOLS_OPEN','VOICE_DETECTED','MOBILE_DETECTED'],
        default:'NO_FACE',
        required:true
    },
    severity:{
        type:String,
        required:true
    },
    screenshot_URL:{
        type:String
    },
    webcamSnapshot:{
        type:String
    },
    deviceInformation:{
        type:String,

    },
    browserInformation:{
        type:String,
        required:true
    },
    AIConfidenceScore:Number

},
{
    timestamps:true
}
)
export const Cheating=mongoose.model('Cheating',CheatingSchema)