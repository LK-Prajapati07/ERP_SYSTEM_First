// dashboard.routes.js

import express from "express";

import { verifyAuth } from "../middleware/auth.middleware.js";

import {
   isAdmin
} from "../middleware/role.middleware.js";

import {

   createDashboardAnalytics,

   getAllDashboardAnalytics,

   getDashboardAnalyticsById,

   getStudentDashboard,

   getTeacherDashboard,

   updateDashboardAnalytics,

   deleteDashboardAnalytics

} from "../Controller/dashboard.controller.js";

const dashboardRouter =
   express.Router();

/* CREATE ANALYTICS */

dashboardRouter.post(
   "/",
   verifyAuth,
   isAdmin,
   createDashboardAnalytics
);

/* GET ALL ANALYTICS */

dashboardRouter.get(
   "/",
   verifyAuth,
   isAdmin,
   getAllDashboardAnalytics
);

/* GET ANALYTICS BY ID */

dashboardRouter.get(
   "/:id",
   verifyAuth,
   getDashboardAnalyticsById
);

/* GET STUDENT DASHBOARD */

dashboardRouter.get(
   "/student/:studentId",
   verifyAuth,
   getStudentDashboard
);

/* GET TEACHER DASHBOARD */

dashboardRouter.get(
   "/teacher/:teacherId",
   verifyAuth,
   getTeacherDashboard
);

/* UPDATE ANALYTICS */

dashboardRouter.put(
   "/:id",
   verifyAuth,
   isAdmin,
   updateDashboardAnalytics
);

/* DELETE ANALYTICS */

dashboardRouter.delete(
   "/:id",
   verifyAuth,
   isAdmin,
   deleteDashboardAnalytics
);

export default dashboardRouter;