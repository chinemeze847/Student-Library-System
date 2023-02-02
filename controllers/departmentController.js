import Department from "../models/Department.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";

import Student from "../models/Student.js";
import Advisor from "../models/Advisor.js";

const createDepartment = async (req, res) => {
  const department = await Department.create(req.body);

  res.status(StatusCodes.CREATED).json({ department });
};

const getAllDepartments = async (req, res) => {
  const { faculty, department, sort, search } = req.query;
  let queryObject = {};

  // ADD BASED ON CONDITIONS
  if (faculty && faculty !== "all") {
    queryObject.faculty = faculty;
  }
  if (department && department !== "all") {
    queryObject.department = department;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  // No AWAIT
  let result = Department.find(queryObject);

  // CHAIN CONNDITIONS
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const departments = await result;

  const totalDepartments = await Department.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalDepartments / limit);

  res.status(StatusCodes.OK).json({
    departments,
    totalDepartments,
    numOfPages,
  });
};

const updateDepartment = async (req, res) => {
  const { id: departmentId } = req.params;

  const department = await Department.findOne({ _id: departmentId });

  if (!department) {
    throw new NotFoundError(`No department with Id: ${departmentId}`);
  }

  await Department.findOneAndUpdate({ _id: departmentId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ msg: "Success: Department Updated!" });
};

const deleteDepartment = async (req, res) => {
  const { id: departmentId } = req.params;

  const department = await Department.findOne({ _id: departmentId });

  if (!department) {
    throw new NotFoundError(`No department with Id: ${departmentId}`);
  }

  const victimStudents = await Student.find({ department: departmentId });
  victimStudents.map(async (student) => await findByIdAndDelete(student._id));
  const victimAdvisor = await Advisor.find({ department: departmentId });
  victimAdvisor.map(async (advisor) => await findByIdAndDelete(advisor._id));

  await department.remove();
  res.status(StatusCodes.OK).json({ msg: "Success: Department Deleted" });
};

export {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
};
