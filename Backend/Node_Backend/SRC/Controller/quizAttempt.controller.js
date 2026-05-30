import { Quiz } from "../models/quiz.model.js";
import { QuizAttempt } from "../models/quizAttement.model.js";

export const startQuizAttempt = async (req, res) => {
    try{
        const { quizId, studentId } = req.body;
        if(!quizId || !studentId){
            return res.status(400).json({ message: "Quiz ID and Student ID are required" });
        }
        const quizAttempt=Quiz.findById(quizId);
        if(!quizAttempt){
            return res.status(404).json({ message: "Quiz not found" });
        }
        const existingAttempt = await QuizAttempt.findOne({ quizId, studentId,inComplete:false });
        if(existingAttempt){
            return res.status(400).json({ message: "Quiz attempt already exists" }); 
        }
        const quiz=await QuizAttempt.create({
             quizId,

            studentId,

            selectedAnswers: [],

            obtainedScore: 0,

            startTime: new Date(),

            submitStatus: "Pending",

            cheatingRiskScore: 0,

            tabSwitchCount: 0,

            fullScreenViolations: 0,

            webcamViolations: 0,

            copyPasteViolations: 0,

            devtoolsViolations: 0,

            isCompleted: false
        })
        return res.status(200).json({ message: "Quiz attempt started successfully", quiz });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const submitQuizAttempt=async(req,res)=>{
    try {
        const {attemptId}=req.params
        const attempt=await QuizAttempt.findById(
            attemptId
        )
        if(!attempt){
            return res.status(400).json({
                message:"Please Provide ID"
            })
        }
        const quiz=await Quiz.findById(attempt.quizId)
        if(!quiz){
            return res.status(400).json({
                message:'Quiz nnot found'
            })
        }
        let score=0;
        quiz.generatedQuestions.forEach(
         (
            question,
            index
         ) => {

            if (
               selectedAnswers[index] ===
               question.correctAnswer
            ) {

               score += question.marks || 1;

            } else {

               score -=
                  quiz.negativeMarking || 0;
            }
         }
      );
      ttempt.selectedAnswers =
         selectedAnswers;

      attempt.obtainedScore = score;

      attempt.endTime =
         new Date();

      attempt.submitStatus =
         "Submitted";

      attempt.isCompleted =
         true;

      await attempt.save();

      return res.status(200).json({

         success: true,

         message:
            "Quiz submitted successfully",

         attempt
      });

    } catch (error) {
        return res.status(500).json({
             success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}
export const getAllQuizAttempts =
async (
   req,
   res
) => {

   try {

      const attempts =
         await QuizAttempt.find()
            .populate("quizId")
            .populate("studentId");

      return res.status(200).json({

         success: true,

         attempts
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};

/* GET QUIZ ATTEMPT BY ID */

export const getQuizAttemptById =
async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const attempt =
         await QuizAttempt.findById(id)
            .populate("quizId")
            .populate("studentId");

      if (!attempt) {

         return res.status(404).json({

            success: false,

            message:
               "Quiz attempt not found"
         });
      }

      return res.status(200).json({

         success: true,

         attempt
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};

/* GET STUDENT QUIZ ATTEMPTS */

export const getStudentQuizAttempts =
async (
   req,
   res
) => {

   try {

      const { studentId } =
         req.params;

      const attempts =
         await QuizAttempt.find({
            studentId
         })
            .populate("quizId");

      return res.status(200).json({

         success: true,

         attempts
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};

/* DELETE QUIZ ATTEMPT */

export const deleteQuizAttempt =
async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const deletedAttempt =
         await QuizAttempt.findByIdAndDelete(
            id
         );

      if (!deletedAttempt) {

         return res.status(404).json({

            success: false,

            message:
               "Quiz attempt not found"
         });
      }

      return res.status(200).json({

         success: true,

         message:
            "Quiz attempt deleted successfully"
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error"
      });
   }
};

/* UPDATE CHEATING DATA */

export const updateCheatingData =
async (
   req,
   res
) => {

   try {

      const { attemptId } =
         req.params;

      
      const updatedAttempt =
         await QuizAttempt.findByIdAndUpdate(

            attemptId,

           req.body,

            {
               new: true
            }
         );

      if (!updatedAttempt) {

         return res.status(404).json({

            success: false,

            message:
               "Quiz attempt not found"
         });
      }

      return res.status(200).json({

         success: true,

         message:
            "Cheating data updated successfully",

         updatedAttempt
      });

   } catch (error) {

      return res.status(500).json({

         success: false,

         message:
            "Internal Server Error",

         error: error.message
      });
   }
}