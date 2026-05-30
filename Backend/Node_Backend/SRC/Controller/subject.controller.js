import { Subject } from "../models/Subject.model.js";

export const createSubject =async (req, res) => {
    try{
        const {subjectName,subjectCode,semester,department,credit,teacherAssigned,syllabus,subjectDescription,totalLecture,subjectType}=req.body
        if(!subjectName || !subjectCode || !semester || !department || !credit || !teacherAssigned || !syllabus || !subjectDescription || !totalLecture){
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newSubject=await Subject.create({
              subjectName,
            subjectCode,
            semester,
            department,
            credit,
            teacherAssigned,
            syllabus,
            subjectDescription,
            totalLecture,
            subjectType
        })
        res.status(201).json({ message: 'Subject created successfully', subject: newSubject });
    }catch(error){
        res.status(500).json({ message: 'Error creating subject', error: error.message });
    }
}
export const getAllSubjects=async(req,res)=>{
    try{
        const subjects=await Subject.find().populate("teacherAssigned","employeeId specialization")
        if(!subjects){
            return res.status(404).json({ message: 'No subjects found' });
        }
      return  res.status(200).json({ message: 'Subjects fetched successfully', subjects });
    }catch(error){
       return res.status(500).json({ message: 'Error fetching subjects', error: error.message });
    }

}
export const assignTeacherToSubject=async(req,res)=>{
    try{
        const {id}=req.params
        const {teacherAssigned}=req.body
        const subject=await Subject
        .findById(id)
        if(!subject){
            return res.status(404).json({ message: 'Subject not found' });
        }
        subject.teacherAssigned=teacherAssigned
        await subject.save()
         return res.status(200).json({ message: 'Teacher assigned successfully', subject });
    }catch(error){
       return res.status(500).json({ message: 'Error assigning teacher', error: error.message });
    }
}
export const deleteSubject=async(req,res)=>{
    try{
        const {id}=req.params
        const subject=await Subject.findByIdAndDelete(id)
        if(!subject){
            return res.status(404).json({ message: 'Subject not found' });
        }
       return res.status(200).json({ message: 'Subject deleted successfully' });
    }catch(error){
        return res.status(500).json({ message: 'Error deleting subject', error: error.message });
    }

}
export const updateSubject=async(req,res)=>{
    try{
        const {id}=req.params
        const updatedSubject=await Subject.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedSubject){
            return res.status(404).json({ message: 'Subject not found' });
        }
        return res.status(200).json({ message: 'Subject updated successfully', subject: updatedSubject });
    }catch(error){
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const getSubjectById=async(req,res)=>{
    try{
        const {id}=req.params
        const subject=await Subject
        .findById(id)
        if(!subject){
            return res.status(404).json({ message: 'Subject not found' });
        }
        return res.status(200).json({ message: 'Subject fetched successfully', subject });
    }catch(error){  
        return res.status(500).json({message:'Internal Server Error'})
    }
}