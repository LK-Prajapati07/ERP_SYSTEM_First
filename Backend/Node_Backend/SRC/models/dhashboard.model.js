import mongoose from "mongoose";

const DashboardAnalyticsSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        },

        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher"
        },

        attendancePercentage: {
            type: Number,
            default: 0
        },

        averageMarks: {
            type: Number,
            default: 0
        },

        currentCGPA: {
            type: Number,
            default: 0
        },

        quizPerformance: {
            type: Number,
            default: 0
        },

        assignmentCompletionRate: {
            type: Number,
            default: 0
        },

        plagiarismAverage: {
            type: Number,
            default: 0
        },

        cheatingIncidents: {
            type: Number,
            default: 0
        },

        totalAssignments: {
            type: Number,
            default: 0
        },

        completedAssignments: {
            type: Number,
            default: 0
        },

        totalQuizzes: {
            type: Number,
            default: 0
        },

        completedQuizzes: {
            type: Number,
            default: 0
        },

        totalExams: {
            type: Number,
            default: 0
        },

        passedExams: {
            type: Number,
            default: 0
        },

        failedExams: {
            type: Number,
            default: 0
        },

        aiGeneratedQuizCount: {
            type: Number,
            default: 0
        },

        aiGeneratedQuestionPaperCount: {
            type: Number,
            default: 0
        },

        performanceStatus: {
            type: String,
            enum: [
                "Excellent",
                "Good",
                "Average",
                "Poor"
            ],
            default: "Average"
        }
    },
    {
        timestamps: true
    }
);

export const DashboardAnalytics = mongoose.model(
    "DashboardAnalytics",
    DashboardAnalyticsSchema
);