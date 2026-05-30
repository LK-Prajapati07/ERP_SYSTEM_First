import mongoose from "mongoose";

const QuizAttemptSchema = new mongoose.Schema(
    {
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true
        },

        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },

        selectedAnswers: {
            type: [String],
            required: true
        },

        obtainedScore: {
            type: Number,
            required: true,
            default: 0
        },

        startTime: {
            type: Date,
            required: true
        },

        endTime: {
            type: Date,
            required: true
        },

        submitStatus: {
            type: String,
            enum: ["Pending", "Attempted", "Submitted"],
            default: "Pending",
            required: true
        },

        cheatingRiskScore: {
            type: Number,
            default: 0
        },

        aiAnalysis: {
            type: String
        },

        tabSwitchCount: {
            type: Number,
            default: 0
        },

        fullScreenViolations: {
            type: Number,
            default: 0
        },

        webcamViolations: {
            type: Number,
            default: 0
        },

        copyPasteViolations: {
            type: Number,
            default: 0
        },

        devtoolsViolations: {
            type: Number,
            default: 0
        },

        isCompleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const QuizAttempt= mongoose.model(
    "QuizAttempt",
    QuizAttemptSchema
);