import { Submission } from "../models/Submission.model.js"
export const createSubmission = async (req, res) => {
  try {

    const {
      assignmentId,
      studentId,
      uploadFileUrl
    } = req.body;

    if (
      !assignmentId ||
      !studentId ||
      !uploadFileUrl
    ) {
      return res.status(400).json({
        success: false,
        message:
          "assignmentId, studentId and uploadFileUrl are required"
      });
    }

    const newSubmission =
      await Submission.create({

        assignmentId,

        studentId,

        uploadFileUrl,

        submissionTime:
          new Date(),

        markObtained: 0,

        plagiarismScore: 0,

        feedback: "",

        status: "Pending"
      });

    return res.status(201).json({

      success: true,

      message:
        "Submission created successfully",

      submission:
        newSubmission
    });

  } catch (error) {

 

    return res.status(500).json({

      success: false,

      message:
        "Internal Server Error",

      error:
        error.message
    });
  }
};
export const getAllSubmissions=async(req,res)=>{
    try{
        const submissions=await Submission.find().populate('assignmentId').populate('studentId')
        return res.status(200).json({message:'submissions fetched successfully',submissions})
    }
    catch(error){
        return res.status(500).json({message:'internal server error'})
    }
}
export const updateSubmission=async(req,res)=>{
    try{
        const {id}=req.params
        const updatedSubmission =
await Submission.findByIdAndUpdate(

   id,

   req.body,

   {
      new: true,
      runValidators: true
   }
);
        if(!updatedSubmission){
            return res.status(404).json({message:'submission not found'})
        }
        return res.status(200).json({message:'submission updated successfully',submission:updatedSubmission})
    }catch(error){
        return res.status(500).json({message:'internal server error'})
    }
}
export const deleteSubmission=async(req,res)=>{
    try{
        const {id}=req.params
        const deletedSubmission=await Submission.findByIdAndDelete(id)
        if(!deletedSubmission){
            return res.status(404).json({message:'submission not found'})
        }
        return res.status(200).json({message:'submission deleted successfully'})
    }catch(error){
        return res.status(500).json({message:'internal server error'})
    }
}
export const evaluateSubmission=async(req,res)=>{
    try{
        const {id}=req.params
        const {markObtained,feedback,plagiarismScore,status}=req.body
        const updatedSubmission=await Submission.findByIdAndUpdate(id,{markObtained,feedback,plagiarismScore,status},{new:true})
        if(!updatedSubmission){
            return res.status(404).json({message:'submission not found'})
        }
        return res.status(200).json({message:'submission evaluated successfully',submission:updatedSubmission})
    }catch(error){
        return res.status(500).json({message:'internal server error'})
    }
}

export const getSubmissionById =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const submission =
      await Submission
        .findById(id)
        .populate("assignmentId")
        .populate("studentId");

    if (!submission) {

      return res.status(404).json({
        message:
          "Submission not found"
      });
    }

    return res.status(200).json({
      submission
    });

  } catch (error) {

    return res.status(500).json({
      message:
        "Internal Server Error",
      error:
        error.message
    });
  }
};