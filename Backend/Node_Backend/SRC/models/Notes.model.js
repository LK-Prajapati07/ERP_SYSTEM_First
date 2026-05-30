import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
        },

        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },

        pdf_url: {
            type: String,
            required: true,
        },

        extractedText: {
            type: String,
            required: true,
        },

        aiSummary: {
            type: String,
        },

        tags: {
            type: [String],
            default: [],
        },

        semester: {
            type: Number,
            required: true,
        },

        totalPages: {
            type: Number,
        },

        fileSize: {
            type: Number,
        },

        vectorDbId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Notes = mongoose.model(
    "Notes",
    notesSchema
);