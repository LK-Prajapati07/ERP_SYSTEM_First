import { Result } from "../models/Result.model.js"

export const createResult=async(req,res)=>{
    try {
        const {StudentId,SubjectId,marksObtained,examType,totalMarks,percentage,grade,remarks,semester,examDate}=req.body
        const result=await Result.create({
            StudentId,SubjectId,marksObtained,examType,totalMarks,percentage,grade,remarks,semester,examDate
        })
       return res.status(201).json({
            success:true,
            message:"Result created successfully",
            result
        })
    }
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to create result",
            error:error.message
        })
    }
}
export const getAllResults=async(req,res)=>{
    try {
        const results=await Result.find().populate('StudentId').populate('SubjectId')
        res.status(200).json({
            success:true,
            message:"Results retrieved successfully",
            results
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to retrieve results",
            error:error.message
        })
    }
}
export const getResultByStudent=async(req,res)=>{
    try {
        const {studentId}=req.params
        const results=await Result.find({StudentId:studentId}).populate('SubjectId')
        return res.status(200).json({
            success:true,
            message:"Results retrieved successfully",
            results
        })
    }
    catch (error) {
      return  res.status(500).json({
            success:false,
            message:"Failed to retrieve results",
            error:error.message
        })
    }
}
export const updateResults=async(req,res)=>{
    try {
        const {id}=req.params
        const updatedResult=await Result.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(200).json({message:"Update successfully",success:true,updatedResult})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",scuccess:false,error:error.message})
    }
}
export const deleteResult=async(req,res)=>{
    try {
        const {id}=req.params
        const deleteResult=await Result.findByIdAndDelete(id)
        return res.status(200).json({message:"Result Delete Successfully",success:true,deleteResult})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",scuccess:false,error:error.message})
    }
}