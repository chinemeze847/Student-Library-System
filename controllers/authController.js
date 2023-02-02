import Advisor from "../models/Advisor.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import Department from "../models/Department.js";

const register = async (req, res) => {
  const { fullname, username, email, password, department, isAdmin } = req.body;

  if (!fullname || !username || !password || !email || !department) {
    throw new BadRequestError("Please provide all fields");
  }

  const usernameAlreadyExist = await Advisor.findOne({ username });

  if (usernameAlreadyExist) {
    throw new BadRequestError("Email Already in use");
  }

  const advisor = await Advisor.create({
    fullname,
    email,
    password,
    department,
    username,
    isAdmin,
  });
  const token = advisor.createJWT();

  const departmentId = JSON.stringify(advisor.department);
  const departmentDoc = await Department.findById(departmentId.slice(1, -1));

  res.status(StatusCodes.CREATED).json({
    advisor: {
      username: advisor.username,
      email: advisor.email,
      fullname: advisor.fullname,
      department: departmentDoc.abbrevation,
    },
    token,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please Provide all Values");
  }

  const advisor = await Advisor.findOne({ username }).select("+password");

  if (!advisor) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await advisor.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = advisor.createJWT();
  advisor.password = undefined;
  res.status(StatusCodes.OK).json({ advisor, token });
};

const updateAdvisor = async (req, res) => {
  const { fullname, username, email, password, department } = req.body;

  if (!fullname || !username || !password || !email || !department) {
    throw new BadRequestError("Please provide all fields");
  }

  const advisor = await Advisor.findOne({ _id: req.advisor.advisorId });

  advisor.email = email;
  advisor.fullname = fullname;
  advisor.username = username;
  advisor.department = department;

  await advisor.save();

  const token = advisor.createJWT();

  res.status(StatusCodes.OK).json({ advisor, token });
};

const getAllAdvisors = async (req, res) => {
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
  let result = Advisor.find(queryObject);

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

  let advisors = await result;

  advisors = await Promise.all(
    advisors.map(async (advisor) => {
      const singleDeptID = JSON.stringify(advisor.department);
      const departmentDoc = await Department.findById(
        singleDeptID.slice(1, -1)
      );

      return {
        ...advisor._doc,
        department: departmentDoc.abbrevation,
      };
    })
  );

  const totalAdvisors = await Advisor.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalAdvisors / limit);

  res.status(StatusCodes.OK).json({
    advisors,
    totalAdvisors,
    numOfPages,
  });
};

const deleteAdvisor = async (req, res) => {
  const { id: advisorId } = req.params;

  const advisor = await Advisor.findOne({ _id: advisorId });

  if (!advisor) {
    throw new NotFoundError(`No advisor with Id: ${advisorId}`);
  }

  await advisor.remove();
  res.status(StatusCodes.OK).json({ msg: "Success: Advisor Deleted" });
};

export { register, login, updateAdvisor, getAllAdvisors };
