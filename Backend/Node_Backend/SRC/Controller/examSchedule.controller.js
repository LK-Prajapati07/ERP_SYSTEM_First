import ExamSchedule from "../models/ExamSchedule.model.js";

/* CREATE EXAM SCHEDULE */

export const createExamSchedule =
async (
   req,
   res
) => {

   try {

      const {

         courseId,

         semester,

         academicSession,

         createdBy,

         publishStatus,

         examList,

         instructions

      } = req.body;

      /* VALIDATION */

      if (
         !courseId ||
         !semester ||
         !academicSession ||
         !createdBy ||
         !examList
      ) {

         return res.status(400).json({

            success: false,

            message:
               "All required fields are required"
         });
      }

      /* CREATE EXAM SCHEDULE */

      const examSchedule =
         await ExamSchedule.create({

            courseId,

            semester,

            academicSession,

            createdBy,

            publishStatus,

            examList,

            instructions
         });

      return res.status(201).json({

         success: true,

         message:
            "Exam schedule created successfully",

         examSchedule
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

/* GET ALL EXAM SCHEDULES */

export const getAllExamSchedules =
async (
   req,
   res
) => {

   try {

      const examSchedules =
         await ExamSchedule.find()
            .populate("courseId")
            .populate("createdBy")
            .populate("examList");

      return res.status(200).json({

         success: true,

         examSchedules
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

/* GET EXAM SCHEDULE BY ID */

export const getExamScheduleById =
async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const examSchedule =
         await ExamSchedule.findById(id)
            .populate("courseId")
            .populate("createdBy")
            .populate("examList");

      if (!examSchedule) {

         return res.status(404).json({

            success: false,

            message:
               "Exam schedule not found"
         });
      }

      return res.status(200).json({

         success: true,

         examSchedule
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

/* UPDATE EXAM SCHEDULE */

export const updateExamSchedule =
async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const updatedExamSchedule =
         await ExamSchedule.findByIdAndUpdate(

            id,

            req.body,

            {
               new: true
            }
         );

      if (!updatedExamSchedule) {

         return res.status(404).json({

            success: false,

            message:
               "Exam schedule not found"
         });
      }

      return res.status(200).json({

         success: true,

         message:
            "Exam schedule updated successfully",

         updatedExamSchedule
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

/* DELETE EXAM SCHEDULE */

export const deleteExamSchedule =
async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const deletedExamSchedule =
         await ExamSchedule.findByIdAndDelete(
            id
         );

      if (!deletedExamSchedule) {

         return res.status(404).json({

            success: false,

            message:
               "Exam schedule not found"
         });
      }

      return res.status(200).json({

         success: true,

         message:
            "Exam schedule deleted successfully"
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

/* PUBLISH EXAM SCHEDULE */

export const publishExamSchedule =
async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const examSchedule =
         await ExamSchedule.findByIdAndUpdate(

            id,

            {
               publishStatus:
                  "Published"
            },

            {
               new: true
            }
         );

      if (!examSchedule) {

         return res.status(404).json({

            success: false,

            message:
               "Exam schedule not found"
         });
      }

      return res.status(200).json({

         success: true,

         message:
            "Exam schedule published successfully",

         examSchedule
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

/* GET EXAM SCHEDULE BY SEMESTER */

export const getExamScheduleBySemester =
async (
   req,
   res
) => {

   try {

      const { semester } =
         req.params;

      const examSchedules =
         await ExamSchedule.find({
            semester
         })
            .populate("courseId")
            .populate("createdBy")
            .populate("examList");

      return res.status(200).json({

         success: true,

         examSchedules
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