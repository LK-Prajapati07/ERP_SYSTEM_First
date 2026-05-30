import mongoose from "mongoose";

const courseSchema =
  new mongoose.Schema(

    {
      courseName: {
        type: String,
        required: true,
        trim: true,
      },

      courseCode: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
      },

      duration: {
        type: Number,
        required: true,
      },

      totalSemester: {
        type: Number,
        required: true,
      },

      department: {
        type: String,
        required: true,

        enum: [
          "BCA",
          "MCA",
          "B.Tech",
          "MBA",
          "CSE",
          "IT",
        ],
      },

      description: {
        type: String,
        required: true,
      },

      subjectList: [
        {
          type:
            mongoose.Schema.Types.ObjectId,

          ref: "Subject",
        },
      ],

      totalCredit: {
        type: Number,
        required: true,
      },

      eligibility: {
        type: String,

        enum: [
          "10th",
          "12th",
          "BCA",
          "B.Tech",
          "MCA",
          "MBA",
        ],

        default: "12th",
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    },

    {
      timestamps: true,
    }

  );

export const Course =
  mongoose.model(
    "Course",
    courseSchema
  );