import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({

  subjectId: {

     type: mongoose.Schema.Types.ObjectId,

     ref: "Subject",

     required: true
  },

  teacherId: {

     type: mongoose.Schema.Types.ObjectId,

     ref: "Teacher",

     required: true
  },

  semester: {

     type: Number,

     required: true
  },

  generatedQuestions: [

     {

        question: {

           type: String,

           required: true
        },

        options: {

           type: [String],

           default: []
        },

        correctAnswer: {

           type: String
        },

        explanation: {

           type: String
        },

        marks: {

           type: Number,

           default: 1
        },

        difficulty: {

           type: String,

           enum: [
              "Easy",
              "Medium",
              "Hard"
           ],

           default: "Easy"
        },

        bloomLevel: {

           type: String,

           enum: [

              "Remember",

              "Understand",

              "Apply",

              "Analyze",

              "Evaluate",

              "Create"
           ],

           default: "Remember"
        }
     }
  ],

  totalMark: {

     type: Number,

     min: 0,

     required: true
  },

  duration: {

     type: String,

     required: true
  },

  difficultyDistribution: {

     easy: {

        type: Number,

        default: 0
     },

     medium: {

        type: Number,

        default: 0
     },

     hard: {

        type: Number,

        default: 0
     }
  },

  BloomTaxonomyDistribution: {

     remember: {

        type: Number,

        default: 0
     },

     understand: {

        type: Number,

        default: 0
     },

     apply: {

        type: Number,

        default: 0
     },

     analyze: {

        type: Number,

        default: 0
     },

     evaluate: {

        type: Number,

        default: 0
     },

     create: {

        type: Number,

        default: 0
     }
  },

  examType: {

     type: String,

     enum: [

        "Quiz",

        "Lab",

        "Theory",

        "Mid Semester",

        "End Semester",

        "Assignment",

        "Practical"
     ],

     required: true
  },

  generatedByAI: {

     type: Boolean,

     default: false
  },

  generationPrompt: {

     type: String
  },

  generatedPdfUrl: {

     type: String
  },

  vectorDocumentId: {

     type: String
  }

},

{


  timestamps: true


}
);

export const Question =
mongoose.model(
"Question",
QuestionSchema
);
