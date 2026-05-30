import mongoose from "mongoose";
const ExamScheduleSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },

        semester: {
            type: Number,
            required: true
        },

        academicSession: {
            type: String,
            required: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        },

        publishStatus: {
            type: String,
            enum: [
                "Draft",
                "Published",
                "Updated",
                "Cancelled"
            ],
            default: "Draft"
        },

        examList: {
            type:[String],
            required: true,
            default: []
        },

        instructions: {
            type: String
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model(
    "ExamSchedule",
    ExamScheduleSchema
);