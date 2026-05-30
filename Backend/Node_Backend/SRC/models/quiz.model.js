import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    quizTitle: {
      type: String,
      required: true,
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    generatedQuestions: [
      {
        question: {
          type: String,
          required: true,
        },

        options: [
          {
            type: String,
          },
        ],

        correctAnswer: {
          type: String,
          required: true,
        },

        explanation: {
          type: String,
        },
      },
    ],
    difficultyLevel: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
      default: "Easy",
    },

    quizType: {
      type: String,
      enum: ["MCQ", "Subjective", "TRUE/FALSE", "Coding"],
      default: "MCQ",
      required: true,
    },

    totalMarks: {
      type: Number,
      min: 0,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    negativeMarking: {
      type: Number,
      default: 0,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    generatedType: {
      type: String,
      enum: ["AI", "Manual"],
      required: true,
      default: "AI",
    },

    instructions: {
      type: String,
    },

    antiCheatEnabled: {
      type: Boolean,
      default: true,
    },

    maxAttempts: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["Draft", "Scheduled", "Active", "Completed"],
      default: "Draft",
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Quiz = mongoose.model("Quiz", QuizSchema);
