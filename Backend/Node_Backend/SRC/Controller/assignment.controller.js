import { Assignment } from "../models/Assignment.model.js"

export const createAssignment=async(req,res)=>{
    try{
     const {assignmentTitle,subjectId,description,teacherId,Document_url,deadline,totalMark,instruction,assignmentType}=req.body
     if(!assignmentTitle || !subjectId || !description || !teacherId || !Document_url || !deadline || !totalMark || !assignmentType){
        return res.status(400).json({message:'all fields are required'})
     }
     const newAssignment=await Assignment.create({
        assignmentTitle,
        subjectId,
        description,
        teacherId,
        Document_url,
        deadline,
        totalMark,
        instruction,
        assignmentType
     })
     return res.status(201).json({message:'assignment created successfully',assignment:newAssignment})
    }catch(error){

  

    return res.status(500).json({

        success:false,

        message:'internal server error',

        error:error.message
    })
}
}
export const getAllAssignments=async(req,res)=>{
    try{
        const assignments=await Assignment.find().populate('subjectId').populate('teacherId')
        return res.status(200).json({message:'assignments fetched successfully',assignments})
    }catch(error){
        return res.status(500).json({message:'internal server error'})
    }
}
export const getAssignmentById=async(req,res)=>{
    try{
        const {id}=req.params
        const assignment=await Assignment.findById(id).populate('subjectId').populate('teacherId')
        return res.status(200).json({message:'assignment fetched successfully',assignment})
    }catch(error){
        return res.status(500).json({message:'internal server error'})
    }
}
export const updateAssignment=async(req,res)=>{
    try{
        const {id}=req.params
        const {assignmentTitle,subjectId,description,teacherId,Document_url,deadline,totalMark,instruction,assignmentType}=req.body
        const updatedAssignment=await Assignment.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(200).json({message:'assignment updated successfully',assignment:updatedAssignment})
    }catch(error){
        return res.status(500).json({message:'internal server error'})
    }
}
export const deleteAssignment=async(req,res)=>{
    try{
        const {id}=req.params
        await Assignment.findByIdAndDelete(id)
        return res.status(200).json({message:'assignment deleted successfully'})
    }
    catch(error){
        return res.status(500).json({message:'internal server error'})
    }
}
export const submitAssignment=async(req,res)=>{
    try{
        const {id}=req.params
        const {studentId,submissionUrl}=req.body
        if(!studentId || !submissionUrl){
            return res.status(400).json({message:'all fields are required'})
        }
        const assignment=await Assignment.findById(id)
        if(!assignment){
            return res.status(404).json({message:'assignment not found'})
        }
        assignment.submissions.push({studentId,submissionUrl})
        await assignment.save()
        return res.status(200).json({message:'assignment submitted successfully'})
    }
    catch(error){
        return res.status(500).json({message:'internal server error'})
    }
}
 