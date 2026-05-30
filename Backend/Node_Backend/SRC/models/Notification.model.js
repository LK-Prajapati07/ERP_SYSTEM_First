import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        notificationType: {
            type: String,
            enum: [
                "Announcement",
                "Assignment",
                "Exam",
                "Attendance",
                "AI Alert",
            ],
            default: "AI Alert",
            required: true,
        },

        readStatus: {
            type: String,
            enum: ["Read", "Unread"],
            default: "Unread",
            required: true,
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
            required: true,
        },

        relatedLink: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Notification =mongoose.model("Notification",NotificationSchema);