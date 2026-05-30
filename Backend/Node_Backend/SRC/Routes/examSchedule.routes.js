// examSchedule.routes.js

import express from "express";

import { verifyAuth } from "../middleware/auth.middleware.js";

import {
   isAdmin
} from "../middleware/role.middleware.js";

import {

   createExamSchedule,

   getAllExamSchedules,

   getExamScheduleById,

   updateExamSchedule,

   deleteExamSchedule,

   publishExamSchedule,

   getExamScheduleBySemester

} from "../Controller/examSchedule.controller.js";

const examScheduleRouter =
   express.Router();

/* CREATE EXAM SCHEDULE */

examScheduleRouter.post(
   "/",
   verifyAuth,
   isAdmin,
   createExamSchedule
);

/* GET ALL EXAM SCHEDULES */

examScheduleRouter.get(
   "/",
   verifyAuth,
   getAllExamSchedules
);

/* GET EXAM SCHEDULE BY ID */

examScheduleRouter.get(
   "/:id",
   verifyAuth,
   getExamScheduleById
);

/* GET EXAM SCHEDULE BY SEMESTER */

examScheduleRouter.get(
   "/semester/:semester",
   verifyAuth,
   getExamScheduleBySemester
);

/* UPDATE EXAM SCHEDULE */

examScheduleRouter.put(
   "/:id",
   verifyAuth,
   isAdmin,
   updateExamSchedule
);

/* PUBLISH EXAM SCHEDULE */

examScheduleRouter.put(
   "/:id/publish",
   verifyAuth,
   isAdmin,
   publishExamSchedule
);

/* DELETE EXAM SCHEDULE */

examScheduleRouter.delete(
   "/:id",
   verifyAuth,
   isAdmin,
   deleteExamSchedule
);

export default examScheduleRouter;