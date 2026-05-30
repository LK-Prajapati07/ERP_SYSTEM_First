import { User } from "../models/user.model.js";

/* STUDENT ROLE */

export const isStudent =
async (req, res, next) => {

   try {

      if (!req.user) {

         return res.status(401).json({

            success: false,

            message: "Unauthorized Access"
         });
      }

      const user =
         await User.findOne({

            uid: req.user.uid
         });

      if (!user) {

         return res.status(404).json({

            success: false,

            message: "User not found"
         });
      }

      if (user.role !== "Student") {

         return res.status(403).json({

            success: false,

            message: "Student access only"
         });
      }

      if (
         user.AccountStatus !== "active"
      ) {

         return res.status(403).json({

            success: false,

            message: "Your account is disabled"
         });
      }

      req.dbUser = user;

      next();

   } catch (error) {

    

      return res.status(500).json({

         success: false,

         message: "Internal Server Error",

         error: error.message
      });
   }
};

/* TEACHER ROLE */

export const isTeacher =
async (req, res, next) => {

   try {

      if (!req.user) {

         return res.status(401).json({

            success: false,

            message: "Unauthorized Access"
         });
      }

      const user =
         await User.findOne({

            uid: req.user.uid
         });

      if (!user) {

         return res.status(404).json({

            success: false,

            message: "User not found"
         });
      }

      if (user.role !== "Teacher") {

         return res.status(403).json({

            success: false,

            message: "Teacher access only"
         });
      }

      if (
         user.AccountStatus !== "active"
      ) {

         return res.status(403).json({

            success: false,

            message: "Your account is disabled"
         });
      }

      req.dbUser = user;

      next();

   } catch (error) {

    
      return res.status(500).json({

         success: false,

         message: "Internal Server Error",

         error: error.message
      });
   }
};

/* ADMIN ROLE */

export const isAdmin =
async (req, res, next) => {

   try {

      if (!req.user) {

         return res.status(401).json({

            success: false,

            message: "Unauthorized Access"
         });
      }

      const user =
         await User.findOne({

            uid: req.user.uid
         });

      if (!user) {

         return res.status(404).json({

            success: false,

            message: "User not found"
         });
      }

      if (user.role !== "Admin") {

         return res.status(403).json({

            success: false,

            message: "Admin access only"
         });
      }

      if (
         user.AccountStatus !== "active"
      ) {

         return res.status(403).json({

            success: false,

            message: "Your account is disabled"
         });
      }

      req.dbUser = user;

      next();

   } catch (error) {

  

      return res.status(500).json({

         success: false,

         message: "Internal Server Error",

         error: error.message
      });
   }
};