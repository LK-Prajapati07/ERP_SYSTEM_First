import { Exam } from "../models/Exam.model.js";

/* CREATE EXAM */

export const createExam = async (
   req,
   res
) => {

   try {

      const {

         examName,

         subjectId,

         examType,

         semester,

         date,

         startTime,

         endTime,

         examHall,

         invigilatorId,

         instructions,

         totalMarks

      } = req.body;

      /* VALIDATION */

      if (
         !examName ||
         !subjectId ||
         !examType ||
         !semester ||
         !date ||
         !startTime ||
         !endTime ||
         !examHall ||
         !invigilatorId ||
         !instructions ||
         !totalMarks
      ) {

         return res.status(400).json({

            success: false,

            message:
               "All required fields are required"
         });
      }

      /* CREATE EXAM */

      const exam =
         await Exam.create({

            examName,

            subjectId,

            examType,

            semester,

            date,

            startTime,

            endTime,

            examHall,

            invigilatorId,

            instructions,

            totalMarks
         });

      return res.status(201).json({

         success: true,

         message:
            "Exam created successfully",

         exam
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error",

         error: error.message
      });
   }
};

/* GET ALL EXAMS */

export const getAllExams = async (
   req,
   res
) => {

   try {

      const exams =
         await Exam.find()
            .populate("subjectId")
            .populate("invigilatorId");

      return res.status(200).json({

         success: true,

         exams
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error",

         error: error.message
      });
   }
};

/* GET EXAM BY ID */

export const getExamById = async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const exam =
         await Exam.findById(id)
            .populate("subjectId")
            .populate("invigilatorId");

      if (!exam) {

         return res.status(404).json({

            success: false,

            message:
               "Exam not found"
         });
      }

      return res.status(200).json({

         success: true,

         exam
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error",

         error: error.message
      });
   }
};

/* UPDATE EXAM */

export const updateExam = async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const updatedExam =
         await Exam.findByIdAndUpdate(

            id,

            req.body,

            {
               new: true
            }
         );

      if (!updatedExam) {

         return res.status(404).json({

            success: false,

            message:
               "Exam not found"
         });
      }

      return res.status(200).json({

         success: true,

         message:
            "Exam updated successfully",

         updatedExam
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error",

         error: error.message
      });
   }
};

/* DELETE EXAM */

export const deleteExam = async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const deletedExam =
         await Exam.findByIdAndDelete(id);

      if (!deletedExam) {

         return res.status(404).json({

            success: false,

            message:
               "Exam not found"
         });
      }

      return res.status(200).json({

         success: true,

         message:
            "Exam deleted successfully"
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error",

         error: error.message
      });
   }
};

/* GET EXAMS BY SUBJECT */

export const getExamsBySubject =
async (
   req,
   res
) => {

   try {

      const { subjectId } =
         req.params;

      const exams =
         await Exam.find({
            subjectId
         })
            .populate("subjectId")
            .populate("invigilatorId");

      return res.status(200).json({

         success: true,

         exams
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error",

         error: error.message
      });
   }
};