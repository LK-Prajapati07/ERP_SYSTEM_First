import { Cheating } from "../models/Cheating.model.js";

/* CREATE CHEATING LOG */

export const createCheatingLog =
async (
   req,
   res
) => {

   try {

      const {

         studentId,

         quizId,

         eventType,

         severity,

         screenshotUrl,

         webcamSnapshotUrl,

         deviceInformation,

         browserInformation,

         aiConfidenceScore

      } = req.body;

      /* VALIDATION */

      if (
         !studentId ||
         !quizId ||
         !eventType ||
         !severity ||
         !browserInformation
      ) {

         return res.status(400).json({

            success: false,

            message:
               "All required fields are required"
         });
      }

      /* CREATE LOG */

      const cheatingLog =
         await Cheating.create({

            studentId,

            quizId,

            eventType,

            severity,

            screenshotUrl,

            webcamSnapshotUrl,

            deviceInformation,

            browserInformation,

            aiConfidenceScore
         });

      return res.status(201).json({

         success: true,

         message:
            "Cheating log created successfully",

         cheatingLog
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

/* GET ALL CHEATING LOGS */

export const getAllCheatingLogs =
async (
   req,
   res
) => {

   try {

      const cheatingLogs =
         await Cheating.find()
            .populate("studentId")
            .populate("quizId");

      return res.status(200).json({

         success: true,

         cheatingLogs
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

/* GET CHEATING LOG BY ID */

export const getCheatingLogById =
async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const cheatingLog =
         await Cheating.findById(id)
            .populate("studentId")
            .populate("quizId");

      if (!cheatingLog) {

         return res.status(404).json({

            success: false,

            message:
               "Cheating log not found"
         });
      }

      return res.status(200).json({

         success: true,

         cheatingLog
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

/* GET STUDENT CHEATING LOGS */

export const getStudentCheatingLogs =
async (
   req,
   res
) => {

   try {

      const { studentId } =
         req.params;

      const cheatingLogs =
         await Cheating.find({
            studentId
         });

      return res.status(200).json({

         success: true,

         cheatingLogs
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};

/* UPDATE CHEATING LOG */

export const updateCheatingLog =
async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const updatedLog =
         await Cheating.findByIdAndUpdate(

            id,

            req.body,

            {
               new: true
            }
         );

      if (!updatedLog) {

         return res.status(404).json({

            success: false,

            message:
               "Cheating log not found"
         });
      }

      return res.status(200).json({

         success: true,

         message:
            "Cheating log updated successfully",

         updatedLog
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};

/* DELETE CHEATING LOG */

export const deleteCheatingLog =
async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const deletedLog =
         await Cheating.findByIdAndDelete(
            id
         );

      if (!deletedLog) {

         return res.status(404).json({

            success: false,

            message:
               "Cheating log not found"
         });
      }

      return res.status(200).json({

         success: true,

         message:
            "Cheating log deleted successfully"
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};