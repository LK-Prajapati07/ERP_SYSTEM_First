import express from "express";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { firebaseLogin, getCurrentUser, logout } from "../Controller/auth.controller.js";

const router = express.Router();
router.post("/firebase-login",firebaseLogin);
router.post('/logout',verifyAuth,logout)
router.get('/me',verifyAuth,getCurrentUser)
export default router; 