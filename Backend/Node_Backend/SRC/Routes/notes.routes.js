import express from "express";

import { verifyAuth }
from "../middleware/auth.middleware.js";

import {
   isTeacher,
   isStudent
} from "../middleware/role.middleware.js";

import {
   upload
} from "../middleware/upload.middleware.js";

import {

   uploadNotes,

   getAllNotes,

   getNotesBySubject,

   updateNotes,

   deleteNote

} from "../Controller/notes.controller.js";

const notesRouter =
   express.Router();

/* UPLOAD NOTES */

notesRouter.post(
   "/upload",
   verifyAuth,
   isTeacher,
   upload.single("pdf"),
   uploadNotes
);

/* GET ALL NOTES */

notesRouter.get(
   "/",
   verifyAuth,
   getAllNotes
);

/* GET NOTES BY SUBJECT */

notesRouter.get(
   "/subject/:subjectId",
   verifyAuth,
   isStudent,
   getNotesBySubject
);

/* UPDATE NOTES */

notesRouter.put(
   "/update/:id",
   verifyAuth,
   isTeacher,
   updateNotes
);

/* DELETE NOTES */

notesRouter.delete(
   "/delete/:id",
   verifyAuth,
   isTeacher,
   deleteNote
);

export default notesRouter;