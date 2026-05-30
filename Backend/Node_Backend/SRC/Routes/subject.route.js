import express from "express";
import {
    assignTeacherToSubject,
    createSubject,
    deleteSubject,
    getAllSubjects,
    getSubjectById, 
    updateSubject,
} from "../Controller/subject.controller.js";

import { verifyAuth } from "../middleware/auth.middleware.js";

import {
    isAdmin,
   
} from "../middleware/role.middleware.js";

const subjectRouter = express.Router();


// Create Subject
subjectRouter.post( 
    "/",
    verifyAuth,
    isAdmin,
    createSubject
);


// Get All Subjects
subjectRouter.get(
    "/",
    verifyAuth,
    getAllSubjects
);


// Get Single Subject
subjectRouter.get(
    "/:id",
    verifyAuth,
    getSubjectById
);


// Assign Teacher To Subject
subjectRouter.post(
    "/:id/assign-teacher",
    verifyAuth,
    isAdmin,
    assignTeacherToSubject
);


// Update Subject
subjectRouter.put(
    "/:id",
    verifyAuth,
    isAdmin,
    updateSubject
);



subjectRouter.delete(
    "/:id",
    verifyAuth,
    isAdmin,
    deleteSubject
);

export default subjectRouter;