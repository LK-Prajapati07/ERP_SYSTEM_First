import { Attendance } from "../models/Attendance.model.js"
export const markAttendance=async(req,res)=>{
    try {
        const {studentId,subjectId,teacherId,attendanceStatus,date,lectureNumber}=req.body
        if(!studentId || !subjectId || !teacherId  || !attendanceStatus||!date|| !lectureNumber){
            return res.status(400 ).json({message:'Please Provide all information'})
        }
        const attendance=await Attendance.create({
            studentId,
            subjectId,
            teacherId,
            attendanceStatus,
            date,
            lectureNumber
        
        })
        return res.status(200).json({message:'Attendance Marked Successfully',attendance})

    } catch (error) {
        return res.status(500).json({message:'internal server error'})
    }
}
export const getAttendanceByStudentId=async(req,res)=>{
    try {
        const {studentId}=req.params
        const attendance=await Attendance.find({studentId}).populate('studentId').populate('subjectId').populate('teacherId')
        return res.status(200).json({message:'Attendance fetched successfully',attendance})
    } catch (error) {
        return res.status(500).json({message:'internal server error'})
    }
}
export const getAttendanceBySubjectId=async(req,res)=>{
    try {
        const {subjectId}=req.params
        const attendance=await Attendance.find({subjectId}).populate('studentId').populate('subjectId').populate('teacherId')
        return res.status(200).json({message:'Attendance fetched successfully',attendance})
    } catch (error) {
        return res.status(500).json({message:'internal server error'})
    }
}
export const updateAttendance=async(req,res)=>{
    try{
        const {attendanceId}=req.params
        const {attendanceStatus}=req.body
        if(!attendanceStatus){
            return res.status(404).json({message:'Please Provide attendance status'})
        }
        const attendance=await Attendance.findByIdAndUpdate(attendanceId,{attendanceStatus},{new:true})
        if(!attendance){
            return res.status(400).json({message:'Attendance not found'})
        }
        return res.status(200).json({message:'Attendance updated successfully',attendance})
    }catch(error){
        return res.status(500).json({message:'internal server error'})
    }
}
export const deleteAttendance=async(req,res)=>{
    try {
        const {attendanceId}=req.params
        const attendance=await Attendance.findByIdAndDelete(attendanceId)
        if(!attendance){
            return res.status(400).json({message:'Attendance not found'})
        }
        return res.status(200).json({message:'Attendance deleted successfully'})
    } catch (error) {
        return res.status(500).json({message:'internal server error'})
    }
}
