import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 5,
    trim: true,
  },
  abbrevation: {
    type: String,
    required: [true, "Please provide a abbrevation"],
    maxlength: 4,
    unique: true,
  },
  students: {
    type: [String],
  },
  advisors: {
    type: [String],
    
  },
}, {timestamps: true});




export default mongoose.model("Department", DepartmentSchema);
