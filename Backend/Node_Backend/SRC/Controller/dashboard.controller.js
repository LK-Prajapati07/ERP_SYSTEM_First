import { DashboardAnalytics } from "../models/dhashboard.model.js";

/* CREATE DASHBOARD ANALYTICS */

export const createDashboardAnalytics =
async (
   req,
   res
) => {

   try {

      const {

         studentId,

         teacherId,

         attendancePercentage,

         averageMarks,

         currentCGPA,

         quizPerformance,

         assignmentCompletionRate,

         plagiarismAverage,

         cheatingIncidents,

         totalAssignments,

         completedAssignments,

         totalQuizzes,

         completedQuizzes,

         totalExams,

         passedExams,

         failedExams,

         aiGeneratedQuizCount,

         aiGeneratedQuestionPaperCount,

         performanceStatus

      } = req.body;

      const analytics =
         await DashboardAnalytics.create({

            studentId,

            teacherId,

            attendancePercentage,

            averageMarks,

            currentCGPA,

            quizPerformance,

            assignmentCompletionRate,

            plagiarismAverage,

            cheatingIncidents,

            totalAssignments,

            completedAssignments,

            totalQuizzes,

            completedQuizzes,

            totalExams,

            passedExams,

            failedExams,

            aiGeneratedQuizCount,

            aiGeneratedQuestionPaperCount,

            performanceStatus
         });

      return res.status(201).json({

         success: true,

         message:
            "Dashboard analytics created successfully",

         analytics
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

/* GET ALL DASHBOARD ANALYTICS */

export const getAllDashboardAnalytics =
async (
   req,
   res
) => {

   try {

      const analytics =
         await DashboardAnalytics.find()
            .populate("studentId")
            .populate("teacherId");

      return res.status(200).json({

         success: true,

         analytics
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};

/* GET DASHBOARD ANALYTICS BY ID */

export const getDashboardAnalyticsById =
async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const analytics =
         await DashboardAnalytics.findById(id)
            .populate("studentId")
            .populate("teacherId");

      if (!analytics) {

         return res.status(404).json({

            success: false,

            message:
               "Dashboard analytics not found"
         });
      }

      return res.status(200).json({

         success: true,

         analytics
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};

/* GET STUDENT DASHBOARD */

export const getStudentDashboard =
async (
   req,
   res
) => {

   try {

      const { studentId } =
         req.params;

      const dashboard =
         await DashboardAnalytics.findOne({

            studentId
         });

      if (!dashboard) {

         return res.status(404).json({

            success: false,

            message:
               "Student dashboard not found"
         });
      }

      return res.status(200).json({

         success: true,

         dashboard
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};

/* GET TEACHER DASHBOARD */

export const getTeacherDashboard =
async (
   req,
   res
) => {

   try {

      const { teacherId } =
         req.params;

      const dashboard =
         await DashboardAnalytics.findOne({

            teacherId
         });

      if (!dashboard) {

         return res.status(404).json({

            success: false,

            message:
               "Teacher dashboard not found"
         });
      }

      return res.status(200).json({

         success: true,

         dashboard
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};

/* UPDATE DASHBOARD ANALYTICS */

export const updateDashboardAnalytics =
async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const updatedAnalytics =
         await DashboardAnalytics.findByIdAndUpdate(

            id,

            req.body,

            {
               new: true
            }
         );

      if (!updatedAnalytics) {

         return res.status(404).json({

            success: false,

            message:
               "Dashboard analytics not found"
         });
      }

      return res.status(200).json({

         success: true,

         message:
            "Dashboard analytics updated successfully",

         updatedAnalytics
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};

/* DELETE DASHBOARD ANALYTICS */

export const deleteDashboardAnalytics =
async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const deletedAnalytics =
         await DashboardAnalytics.findByIdAndDelete(
            id
         );

      if (!deletedAnalytics) {

         return res.status(404).json({

            success: false,

            message:
               "Dashboard analytics not found"
         });
      }

      return res.status(200).json({

         success: true,

         message:
            "Dashboard analytics deleted successfully"
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};