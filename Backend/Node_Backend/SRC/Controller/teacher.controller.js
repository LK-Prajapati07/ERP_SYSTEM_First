import { Teacher } from "../models/Teacher.model.js";
export const createTeacher = async (req, res) => {
    try {
        const {
            userId,
            department, 
            employeeId,
            specialization,
            subjectsHandled,
            experience,
            joiningDate,
            salary,
            officeRoom,
            availableTimings,
        } = req.body;

        if (
            !userId ||
            !department ||
            !employeeId ||
            !specialization ||
            !subjectsHandled ||
            !experience ||
            !joiningDate ||
            !salary ||
            !officeRoom ||
            !availableTimings
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const teacher = await Teacher.create({
            userId,
            department,
            employeeId,
            specialization,
            subjectsHandled,
            experience,
            joiningDate,
            salary,
            officeRoom,
            availableTimings,
        });
        return res
            .status(201)
            .json({ message: "Teacher created successfully", teacher });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getTeacherProfile = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: "Teacher Not found" });
        }
        const teacher =await Teacher.findById( id );
        return res
            .status(201)
            .json({ message: "Teacher Found Successfull", teacher });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const updateTeacher = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({ message: "Teacher Not found" });
    }
    try {
        const teacher = await Teacher.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res
            .status(200)
            .json({ message: "Teacher Updated Successfully", teacher });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({ message: "Teacher Not found" });
    }
    try {
        await Teacher.findByIdAndDelete(id);
        return res.status(200).json({ message: "Teacher Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        return res
            .status(200)
            .json({ message: "Teachers Found Successfully", teachers });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getTeacherSubjects = async (req, res) => {

    try {

        const { id } = req.params;

        if (!id) {

            return res.status(400).json({
                message:
                    "Teacher ID is required",
            });

        }

        const teacher =
            await Teacher.findById(id)
                .select("subjectsHandled");

        if (!teacher) {

            return res.status(404).json({
                message:
                    "Teacher not found",
            });

        }

        return res.status(200).json({

            message:
                "Teacher subjects fetched successfully",

            subjects:
                teacher.subjectsHandled,

        });

    } catch (error) {

        return res.status(500).json({
            message:
                "Internal Server Error",
        });

    }
};

