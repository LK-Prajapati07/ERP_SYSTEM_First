import axios from "axios";
import { Assignment } from "../models/Assignment.model.js";
import { Submission } from "../models/Submission.model.js";

/* EVALUATE ASSIGNMENT USING AI */

/* EVALUATE ASSIGNMENT */
export const evaluateAssignmentAI = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    const assignment = await Assignment.findById(submission.assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    if (!submission.uploadFileUrl) {
      return res.status(400).json({
        success: false,
        message: "Submission file URL is missing",
      });
    }

    const payload = {
      assignment_id: assignment._id,
      submission_id: submission._id,
      student_id: submission.studentId,
      file_url: submission.uploadFileUrl,
      assignment_title: assignment.assignmentTitle,
      subject_id: assignment.subjectId,
      total_marks: assignment.totalMark,
      rubric: assignment.instruction,
    };

    const { data } = await axios.post(
      `${process.env.FASTAPI_URL}/evaluation/`,
      payload,
    );

    const result = data.result;

    submission.markObtained = result.obtainedMarks;
    submission.feedback = result.feedback;
    submission.aiAnalysis = result.aiAnalysis;
    submission.status = "Checked";

    await submission.save();

    return res.status(200).json({
      success: true,
      message: "Assignment evaluated successfully",
      submission,
    });
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      success: false,
      message: "Assignment evaluation failed",
      error: error.response?.data || error.message,
    });
  }
};

/* GENERATE SUMMARY USING AI */

export const generateSummaryAI = async (req, res) => {
  try {
    const { documentId } = req.body;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "documentId is required",
      });
    }

    const aiResponse = await axios.post(
      `${process.env.FASTAPI_URL}/summary/generate`,
      {
        document_id: documentId,
      },
    );

    return res.status(200).json({
      success: true,
      summary: aiResponse.data.data,
    });
  } catch (error) {
    console.error("SUMMARY ERROR:", error.response?.data);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.response?.data || error.message,
    });
  }
};

/* CHAT WITH NOTES USING RAG */

export const chatWithNotesAI = async (req, res) => {
  try {
    const { question, documentId, studentId } = req.body;

    if (!question || !documentId) {
      return res.status(400).json({
        success: false,

        message: "Question and documentId are required",
      });
    }

    /* SEND REQUEST TO FASTAPI */

    const aiResponse = await axios.post(`${process.env.FASTAPI_URL}/chat/`, {
      document_id: documentId,
      student_id: studentId,
      question,
    });

    const answer = aiResponse.data.answer;

    return res.status(200).json({
      success: true,

      answer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: "Internal Server Error",

      error: error.message,
    });
  }
};



export const plagiarismCheckAI = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    const assignment = await Assignment.findById(submission.assignmentId);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }


   const aiResponse = await axios.post(
  `${process.env.FASTAPI_URL}/PlagiarismSchama`,
  {
    submission_id: submission._id.toString(),
    assignment_id: assignment._id.toString(),
    student_id: submission.studentId.toString(),
    file_url: submission.uploadFileUrl,
    original_text: assignment.description,
  }
);

    const analysis = aiResponse.data?.result?.plagiarism_analysis;

    const plagiarismScore = analysis?.plagiarism_percentage || 0;

    const plagiarismReport = analysis || {};

    submission.plagiarismScore = plagiarismScore;
    submission.plagiarismReport = plagiarismReport;

    await submission.save();

    return res.status(200).json({
      success: true,
      message: "Plagiarism checked successfully",
      plagiarismScore,
      plagiarismReport,
      submission,
    });
  } catch (error) {
    console.error(
      "Plagiarism Check Error:",
      error.response?.data || error.message,
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.response?.data || error.message,
    });
  }
};
