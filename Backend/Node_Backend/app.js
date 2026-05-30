import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express'
import { connectDb } from './SRC/config/Db.js';
import authRouter from './SRC/Routes/auth.route.js'
import cors from 'cors';
import studentRouter from './SRC/Routes/student.route.js';
import subjectRouter from './SRC/Routes/subject.route.js';
import teacherRouter from './SRC/Routes/teacher.route.js';
import submissionRouter from './SRC/Routes/submission.route.js';
import resultRouter from './SRC/Routes/result.route.js';
import quizAttemptRouter from './SRC/Routes/quizAttempt.routes.js';
import quizRouter from './SRC/Routes/quiz.routes.js';
import questionPaperRouter from './SRC/Routes/questionPaper.routes.js';
import notificationRouter from './SRC/Routes/notification.routes.js';
import notesRouter from './SRC/Routes/notes.routes.js';
import examScheduleRouter from './SRC/Routes/examSchedule.routes.js';
import examRouter from './SRC/Routes/exam.routes.js';
import dashboardRouter from './SRC/Routes/dashboard.routes.js';
import cheatingRouter from './SRC/Routes/cheating.routes.js';
import attendanceRouter from './SRC/Routes/attendence.routes.js';
import assignRoutes from './SRC/Routes/assignment.routes.js';
import aiRouter from './SRC/Routes/ai.routes.js';
dotenv.config();
const app=express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api/login',authRouter);
app.use('/api/student',studentRouter)
app.use('/api/subject',subjectRouter)
app.use('/api/teacher',teacherRouter)
app.use('/api/submission', submissionRouter)
app.use('/api/result',resultRouter)
app.use('/api/quizAttempt',quizAttemptRouter)
app.use('/api/quiz',quizRouter)
app.use('/api/questionPaper',questionPaperRouter)
app.use('/api/notification',notificationRouter)
app.use('/api/notes',notesRouter)
app.use('/api/examSchedule',examScheduleRouter)
app.use('/api/ai',aiRouter)

app.use('/api/exam',examRouter) 
app.use('/api/dashboard',dashboardRouter)
app.use('/api/cheating',cheatingRouter)
app.use('/api/attendence',attendanceRouter)
app.use('/api/assignment',assignRoutes)
app.use('/',(req,res)=>{
    res.status(200).json({
        message:"Hello World"
    })
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    connectDb()
})
