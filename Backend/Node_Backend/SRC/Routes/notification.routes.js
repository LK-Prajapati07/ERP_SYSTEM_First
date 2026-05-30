import express from "express";

import { verifyAuth }
from "../middleware/auth.middleware.js";

import {
   isAdmin,
   isTeacher,
   isStudent
} from "../middleware/role.middleware.js";

import {

   createNotification,

   getAllNotifications,

   getNotificationById,

   deleteNotification

} from "../Controller/notification.controller.js";

const notificationRouter =
   express.Router();

/* CREATE NOTIFICATION */

notificationRouter.post(
   "/create",
   verifyAuth,
   isTeacher,
   createNotification
);

/* GET ALL NOTIFICATIONS */

notificationRouter.get(
   "/",
   verifyAuth,
   getAllNotifications
);

/* GET NOTIFICATION BY ID */

notificationRouter.get(
   "/:id",
   verifyAuth,
   getNotificationById
);



/* DELETE NOTIFICATION */

notificationRouter.delete(
   "/delete/:id",
   verifyAuth,
   isAdmin,
   deleteNotification
);

export default notificationRouter;