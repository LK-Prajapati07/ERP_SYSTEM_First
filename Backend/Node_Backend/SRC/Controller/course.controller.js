import { Course } from "../models/course.model.js"

export const createCourse=async(req,res)=>{
    try{

        const {courseName,courseCode,duration,totalSemester,department,description,subjectList,totalCredit,eligibility,createdBy}=req.body
        if(!courseName || !courseCode || !duration || !totalSemester || !department || !description || !subjectList || !totalCredit || !eligibility || !createdBy){
            return res.status(400).json({message:"All fields are required"})
        }
        const course=await Course.create({
            courseName,
            courseCode,
            duration,
            totalSemester,
            department,
            description,
            subjectList,
            totalCredit,
            eligibility,
            createdBy
        })
        return res.status(201).json({message:"Course created successfully",course})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}
export const getAllCourses=async(req,res)=>{
    try{
        const courses=await Course.find().populate("subjectList")
        return res.status(200).json({message:"Courses fetched successfully",courses})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}
export const getCourseById=async(req,res)=>{
    try{
        const {id}=req.params
        const course=await Course.findById(id).populate("subjectList")
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        return res.status(200).json({message:"Course fetched successfully",course})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }  
}
export const updateCourse=async(req,res)=>{
    try{
        const {id}=req.params
        const updatedCourse=await Course.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedCourse){
            return res.status(404).json({message:"Course not found"})
        }
        return res.status(200).json({message:"Course updated successfully",updatedCourse})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}
export const deleteCourse=async(req,res)=>{
    try{
        const {id}=req.params
        const deletedCourse=await Course.findByIdAndDelete(id)
        if(!deletedCourse){
            return res.status(404).json({message:"Course not found"})
        }
        return res.status(200).json({message:"Course deleted successfully"})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}
// export const assignSubjectsToCourse=async(req,res)=>{
//     try{
//         const {courseId}=req.params
//         const {subjectIds}=req.body
//         const course=await Course.findById(courseId)
//         if(!course){
//             return res.status(404).json({message:"Course not found"})
//         }
//         course.subjectList.push(...subjectIds)
//         await course.save()
//         return res.status(200).json({message:"Subjects assigned to course successfully",course})
//     }catch(error){
//         return res.status(500).json({message:"Internal server error"})
//     }
// }