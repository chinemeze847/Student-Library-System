import mongoose from "mongoose";
import validator from "validator";

const StudentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please provide your firstname"],
      minlength: 2,
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Please provide your lastname"],
      minlength: 2,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Please provide a gender"],
      enum: ["male", "female"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone"],
    },
    country: {
      type: String,
      required: [true, "Please provide your country"],
    },
    state: {
      type: String,
      required: [true, "Please provide your state"],
    },
    streetAddress: {
      type: String,
      required: [true, "Please provide your street address"],
    },

    avatar: {
      type: String,
      required: [true, "Please provide your street address"],
    },

    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: [true, "Please provide your department"],
      minlength: 3,
    },
    regNum: {
      type: String,
      required: [true, "Please provide your regNum"],
      minlength: 3,
    },
    entryYear: {
      type: String,
      required: [true, "Please provide your entry year"],
      minlength: 3,
    },
    studentType: {
      type: String,
      required: [true, "Please provide your student type"],
      enum: ["Undergraduate", "Post-graduate"],
    },
    modeOfEntry: {
      type: String,
      required: [true, "Please provide your mode of entry"],
      enum: ["UTME", "Direct Entry (DE)", "Pre-Degree"],
    },
    admissionLetter: {
      type: String,
      required: [true, "Please provide your admission letter"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Advisor",
      required: [true, "Please provide a  user"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email`,
      },
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);
