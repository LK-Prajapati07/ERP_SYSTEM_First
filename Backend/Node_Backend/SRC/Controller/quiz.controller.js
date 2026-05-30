import { Quiz } from "../models/quiz.model.js";
import axios from "axios";

// Create Quiz Manually
export const createQuiz = async (req, res) => {
try {
const {
quizTitle,
subjectId,
teacherId,
generatedQuestions,
difficultyLevel,
quizType,
totalMarks,
duration,
negativeMarking,
startTime,
endTime,
generatedType,
instructions,
} = req.body;


if (
  !quizTitle ||
  !subjectId ||
  !teacherId ||
  !generatedQuestions ||
  !difficultyLevel ||
  !quizType ||
  !totalMarks ||
  !duration ||
  !startTime ||
  !endTime
) {
  return res.status(400).json({
    success: false,
    message: "All fields are required",
  });
}

const quiz = await Quiz.create({
  quizTitle,
  subjectId,
  teacherId,
  generatedQuestions,
  difficultyLevel,
  quizType,
  totalMarks,
  duration,
  negativeMarking,
  startTime,
  endTime,
  generatedType,
  instructions,
});

return res.status(201).json({
  success: true,
  message: "Quiz created successfully",
  quiz,
});


} catch (error) {
return res.status(500).json({
success: false,
message: "Internal Server Error",
error: error.message,
});
}
};

// Generate Quiz using AI
export const generateQuizAI = async (req, res) => {
try {
const {
quizTitle,
subjectId,
teacherId,
difficultyLevel,
quizType,
totalQuestions,
topic,
duration,
totalMarks,
} = req.body;


if (
  !quizTitle ||
  !subjectId ||
  !teacherId ||
  !difficultyLevel ||
  !quizType ||
  !totalQuestions ||
  !topic
) {
  return res.status(400).json({
    success: false,
    message: "Required fields are missing",
  });
}

const aiResponse = await axios.post(
  `${process.env.FASTAPI_URL}/quiz/generate`,
  {
    document_id: subjectId,
    difficulty: difficultyLevel,
    question_type: quizType,
    total_questions: totalQuestions,
    topic,
    include_answers: true,
  }
);

const generatedQuestions = aiResponse.data.quiz || [];

if (!generatedQuestions.length) {
  return res.status(400).json({
    success: false,
    message: "No questions generated",
  });
}

const startTime = new Date();

const endTime = new Date(
  startTime.getTime() + (duration || 30) * 60 * 1000
);

const quiz = await Quiz.create({
  quizTitle,
  subjectId,
  teacherId,
  generatedQuestions,
  difficultyLevel,
  quizType,
  totalMarks,
  duration,
  startTime,
  endTime,
  generatedType: "AI",
});

return res.status(201).json({
  success: true,
  message: "Quiz generated successfully",
  quiz,
});

} catch (error) {
console.error("Generate Quiz AI Error:", error);
return res.status(500).json({
  success: false,
  message: "Internal Server Error",
  error: error.message,
});


}
};

// Get All Quizzes
export const getAllQuizzes = async (req, res) => {
try {
const quizzes = await Quiz.find()
.populate("subjectId", "name")
.populate("teacherId", "name");


return res.status(200).json({
  success: true,
  quizzes,
});


} catch (error) {
return res.status(500).json({
success: false,
message: "Internal Server Error",
error: error.message,
});
}
};

// Get Quiz By Id
export const getQuizById = async (req, res) => {
try {
const { id } = req.params;


const quiz = await Quiz.findById(id)
  .populate("subjectId", "name")
  .populate("teacherId", "name");

if (!quiz) {
  return res.status(404).json({
    success: false,
    message: "Quiz not found",
  });
}

return res.status(200).json({
  success: true,
  quiz,
});


} catch (error) {
return res.status(500).json({
success: false,
message: "Internal Server Error",
error: error.message,
});
}
};

// Update Quiz
export const updateQuiz = async (req, res) => {
try {
const { id } = req.params;


const quiz = await Quiz.findByIdAndUpdate(
  id,
  req.body,
  { new: true }
);

if (!quiz) {
  return res.status(404).json({
    success: false,
    message: "Quiz not found",
  });
}

return res.status(200).json({
  success: true,
  message: "Quiz updated successfully",
  quiz,
});


} catch (error) {
return res.status(500).json({
success: false,
message: "Internal Server Error",
error: error.message,
});
}
};

// Delete Quiz
export const deleteQuiz = async (req, res) => {
try {
const { id } = req.params;

const quiz = await Quiz.findByIdAndDelete(id);

if (!quiz) {
  return res.status(404).json({
    success: false,
    message: "Quiz not found",
  });
}

return res.status(200).json({
  success: true,
  message: "Quiz deleted successfully",
});

} catch (error) {
return res.status(500).json({
success: false,
message: "Internal Server Error",
error: error.message,
});
}
};


// Start Quiz
export const startQuiz = async (req, res) => {
    try{
        const { id } = req.params;
        const quiz = await Quiz.findById(id);
        if(!quiz){
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }
        if(quiz.status !== "Scheduled"){
            return res.status(400).json({ success: false, message: "Quiz is not in scheduled state" });
        }
        quiz.status = "Active";
        await quiz.save();
        return res.status(200).json({ success: true, message: "Quiz started successfully", quiz });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}