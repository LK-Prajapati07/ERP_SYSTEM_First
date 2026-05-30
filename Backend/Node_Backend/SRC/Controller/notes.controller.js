import axios from "axios";
import { Notes } from "../models/Notes.model.js";
import cloudinary from "../config/cloudnary.js";

/* =========================================
   UPLOAD NOTES
========================================= */

export const uploadNotes = async (req, res) => {
  try {
    const { title, description, teacherId, subjectId, semester, tags } =
      req.body;

    /* VALIDATION */

    if (!title || !description || !teacherId || !subjectId || !semester) {
      return res.status(400).json({
        success: false,

        message: "All required fields are required",
      });
    }

    /* CHECK FILE */

    if (!req.file) {
      return res.status(400).json({
        success: false,

        message: "PDF file is required",
      });
    }



    /* =========================================
         UPLOAD PDF TO CLOUDINARY
      ========================================= */

    const uploadedFile = await cloudinary.uploader.upload(
      req.file.path,

      {
        resource_type: "raw",

       folder:"ERP/Notes/Sem5"
      },
    );



    /* =========================================
         SEND PDF TO FASTAPI
      ========================================= */

    const aiResponse = await axios.post(
      `${process.env.FASTAPI_URL.replace(/\/$/, "")}/notes/ingest`,

      {
        document_id: uploadedFile.public_id,

        title,

        subject_id: subjectId,

        teacher_id: teacherId,

        pdf_url: uploadedFile.secure_url,

        semester: Number(semester),

        tags: tags ? tags.split(",") : [],
      },
    );

   

    /* =========================================
         AI DATA
      ========================================= */

    const extractedText = aiResponse.data.extractedText || "";

    const aiSummary = aiResponse.data.aiSummary || "";

    const vectorDbId = aiResponse.data.vectorDbId || "";

    const totalPages = aiResponse.data.totalPages || 0;

    /* =========================================
         SAVE NOTES
      ========================================= */

    const notes = await Notes.create({
      title,

      description,

      teacherId,

      subjectId,

      semester: Number(semester),

      tags: tags ? tags.split(",") : [],

      pdf_url: uploadedFile.secure_url,

      publicId: uploadedFile.public_id,

      fileType: req.file.mimetype,

      originalName: req.file.originalname,

      fileSize: req.file.size,

      extractedText,

      aiSummary,

      vectorDbId,

      totalPages,
    });

    return res.status(201).json({
      success: true,

      message: "Notes uploaded successfully",

      notes,
    });
  } catch (error) {
   

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",

      error: error.response?.data || error.message,
    });
  }
};

/* =========================================
   GET ALL NOTES
========================================= */

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find()

      .populate("teacherId", "employeeId specialization")

      .populate("subjectId", "subjectName subjectCode");

    return res.status(200).json({
      success: true,

      message: "All notes fetched successfully",

      notes,
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
   GET NOTES BY SUBJECT
========================================= */

export const getNotesBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const notes = await Notes.find({
      subjectId,
    })

      .populate("teacherId", "employeeId specialization")

      .populate("subjectId", "subjectName subjectCode");

    return res.status(200).json({
      success: true,

      message: "Notes fetched successfully",

      notes,
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
   UPDATE NOTES
========================================= */

export const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedNote = await Notes.findByIdAndUpdate(
      id,

      req.body,

      {
        returnDocument: "after",

        runValidators: true,
      },
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,

        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,

      message: "Note updated successfully",

      updatedNote,
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
   DELETE NOTES
========================================= */

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Notes.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,

        message: "Note not found",
      });
    }

    /* DELETE FROM CLOUDINARY */

    await cloudinary.uploader.destroy(
      note.publicId,

      {
        resource_type: "image",
      },
    );

    /* DELETE NOTE */

    await Notes.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,

      message: "Note deleted successfully",
    });
  } catch (error) {
   

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",

      error: error.message,
    });
  }
};
