import axios from "axios";

import { Question } from "../models/QustionPaper.model.js";

/* =========================================
CREATE QUESTION PAPER
========================================= */

export const createQuestionPaper = async (req, res) => {
  try {
    const {
      subjectId,

      teacherId,

      semester,

      generatedQuestions,

      totalMark,

      duration,

      difficultyDistribution,

      BloomTaxonomyDistribution,

      examType,

      generatedByAI,

      generationPrompt,

      generatedPdfUrl,

      vectorDocumentId,
    } = req.body;

    /* VALIDATION */

    if (
      !subjectId ||
      !teacherId ||
      !semester ||
      !generatedQuestions ||
      !totalMark ||
      !duration ||
      !examType
    ) {
      return res.status(400).json({
        success: false,

        message: "All required fields are required",
      });
    }

    /* CREATE QUESTION PAPER */

    const questionPaper = await Question.create({
      subjectId,

      teacherId,

      semester,

      generatedQuestions,

      totalMark,

      duration: Number(duration),

      difficultyDistribution,

      BloomTaxonomyDistribution,

      examType,

      generatedByAI,

      generationPrompt,

      generatedPdfUrl,

      vectorDocumentId,
    });

    return res.status(201).json({
      success: true,

      message: "Question Paper Created Successfully",

      questionPaper,
    });
  } catch (error) {
   
    return res.status(500).json({
      success: false,

      message: "Internal Server Error",

      error: error.message,
    });
  }
};

/* =========================================
GENERATE QUESTION PAPER USING RAG AI
========================================= */

export const generateQuestionPaperAI = async (req, res) => {
  try {
    const {
      subjectId,

      teacherId,

      semester,

      difficultyDistribution,

      BloomTaxonomyDistribution,

      examType,

      totalQuestions,

      totalMark,

      duration,

      topic,
    } = req.body;

    /* VALIDATION */

    if (
      !subjectId ||
      !teacherId ||
      !semester ||
      !difficultyDistribution ||
      !examType ||
      !totalQuestions ||
      !topic ||
      !totalMark ||
      !duration
    ) {
      return res.status(400).json({
        success: false,

        message: "All required fields are required",
      });
    }

    /* =====================================
     FASTAPI RAG REQUEST
  ===================================== */

    const aiResponse = await axios.post(
      `${process.env.FASTAPI_URL}/question-paper/generate`,

      {
        subject_id: subjectId,

        course_id: subjectId,

        semester,

        difficulty: "medium",

        total_questions: totalQuestions,

        question_type: examType,

        topic,
      },
    );

   

    /* =====================================
     GENERATED QUESTIONS
  ===================================== */

    const generatedQuestions =
      aiResponse.data.question_paper.question_paper.questions;

    if (!generatedQuestions) {
      return res.status(500).json({
        success: false,

        message: "AI failed to generate questions",
      });
    }

    /* =====================================
     SAVE QUESTION PAPER
  ===================================== */

    const questionPaper = await Question.create({
      subjectId,

      teacherId,

      semester,

      generatedQuestions,

      totalMark,

      duration: Number(duration),

      difficultyDistribution,

      BloomTaxonomyDistribution,

      examType,

      generatedByAI: true,

      generationPrompt: topic,
    });

    return res.status(201).json({
      success: true,

      message: "Question Paper Generated Successfully",

      questionPaper,
    });
  } catch (error) {
   

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",

      error: error.message,
    });
  }
};

/* =========================================
GET ALL QUESTION PAPERS
========================================= */

export const getAllQuestionPapers = async (req, res) => {
  try {
    const questionPapers = await Question.find()

      .populate("subjectId")

      .populate("teacherId");

    return res.status(200).json({
      success: true,

      total: questionPapers.length,

      questionPapers,
    });
  } catch (error) {
    

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

/* =========================================
GET QUESTION PAPER BY ID
========================================= */

export const getQuestionPaperById = async (req, res) => {
  try {
    const { id } = req.params;

    const questionPaper = await Question.findById(id)

      .populate("subjectId")

      .populate("teacherId");

    if (!questionPaper) {
      return res.status(404).json({
        success: false,

        message: "Question Paper Not Found",
      });
    }

    return res.status(200).json({
      success: true,

      questionPaper,
    });
  } catch (error) {

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

/* =========================================
UPDATE QUESTION PAPER
========================================= */

export const updateQuestionPaper = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedQuestionPaper = await Question.findByIdAndUpdate(
      id,

      req.body,

      {
        new: true,

        runValidators: true,
      },
    );

    if (!updatedQuestionPaper) {
      return res.status(404).json({
        success: false,

        message: "Question Paper Not Found",
      });
    }

    return res.status(200).json({
      success: true,

      message: "Question Paper Updated Successfully",

      updatedQuestionPaper,
    });
  } catch (error) {
   

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

export const deleteQuestionPaper = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestionPaper = await Question.findByIdAndDelete(id);

    if (!deletedQuestionPaper) {
      return res.status(404).json({
        success: false,

        message: "Question Paper Not Found",
      });
    }

    return res.status(200).json({
      success: true,

      message: "Question Paper Deleted Successfully",
    });
  } catch (error) {
   

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};
