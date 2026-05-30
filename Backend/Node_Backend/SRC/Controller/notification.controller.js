import { Notification } from "../models/Notification.model.js"

export const createNotification=async(req,res)=>{
    try{
        const {title,message,senderId,receiverId,notificationType,readStatus,priority,relatedLink}=req.body
        if(!title || !message ||!senderId || !receiverId|| !notificationType || !readStatus|| !priority || !relatedLink){
            return res.status(400).json({
                message:"Please Provide All Field"
            })
        }
        const notification=await Notification.create({
            title,
            message,
            senderId,
            receiverId,
            notificationType,
            readStatus,
            priority,relatedLink
        })
        return res.status(201).json({message:"Notification created successfully",notification})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }

}
export const getNotificationById=async(req,res)=>{
    try{
        const {userId}=req.params
        const notifications=await Notification.find({receiverId:userId}).populate("senderId","name email")
        return res.status(200).json({message:"Notifications retrieved successfully",notifications})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})

    }
}
export const markAsRead=async(req,res)=>{
    try{
        const {notificationId}=req.params
        const notification=await Notification.findByIdAndUpdate(notificationId,{readStatus:"Read"},{new:true})
        if(!notification){
            return res.status(404).json({message:"Notification not found"})
        }
        return res.status(200).json({message:"Notification marked as read",notification})
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}
export const deleteNotification=async(req,res)=>{
    try{
        const {notificationId}=req.params
        const notification=await Notification.findByIdAndDelete(notificationId)
        if(!notification){
            return res.status(404).json({message:"Notification not found"})
        }
        return res.status(200).json({message:"Notification deleted successfully"})
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}
export const getAllNotifications=async(req,res)=>{
    try{
        const notifications=await Notification.find().populate("senderId","name email").populate("receiverId","name email")
        return res.status(200).json({message:"All notifications retrieved successfully",notifications})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}
