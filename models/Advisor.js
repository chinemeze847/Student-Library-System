import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const AdvisorSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide your name"],
      minlength: 2,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please provide a unsername"],
      minlength: 2,
      unique: true,
    },

    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: [true, "Please provide your department"],
      minlength: 3,
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
    isAdmin:{
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      select: false,
    },
  },
  { timestamps: true }
);

AdvisorSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Instance mathod to create JWT
AdvisorSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// Instance method to create JWT
AdvisorSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
};

export default mongoose.model("CourseAdvisor", AdvisorSchema);
