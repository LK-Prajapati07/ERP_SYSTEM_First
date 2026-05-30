import mongoose from "mongoose";

const SubmissionSchema =
new mongoose.Schema({

   assignmentId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Assignment",
      required:true
   },

   studentId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Student",
      required:true
   },

   uploadFileUrl:{
      type:String,
      required:true
   },

   submissionTime:{
      type:Date,
      default:Date.now
   },

   markObtained:{
      type:Number,
      default:0
   },

   feedback:{
      type:String,
      default:""
   },

   aiAnalysis: {
    type: Object,
    default: {}
},

   plagiarismScore:{
      type:Number,
      default:0
   },

   status:{
      type:String,
      enum:[
         "Submitted",
         "Pending",
         "Late",
         "Checked"
      ],
      default:"Submitted"
   }

},{
   timestamps:true
});
export const Submission=mongoose.model('Submission',SubmissionSchema)