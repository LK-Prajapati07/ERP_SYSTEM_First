import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    uid: {
        type: String,   // Firebase UID
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["Student", "Teacher", "Admin"],
        default: "Student"
    },
    AccountStatus:{
        type:String,
        enum:['active','disactive'],
        default:'active'
    },
    gender:{
        type:String,
        enum:['male','female'],
        default:'male'
    },
    phoneNumber:{
        type:String,

    }
    

}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);