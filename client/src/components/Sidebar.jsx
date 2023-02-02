import React from "react";
import { Link } from "react-router-dom";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DvrIcon from "@mui/icons-material/Dvr";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useAppContext } from "../context/AppContext";

const Sidebar = () => {
  const { logout } = useAppContext();
  return (
    <div className=" h-full">
      <div className=" border-b h-16 py-2 flex justify-around items-center">
        <p className="text-gray-400 text-lg">Administrator</p>
      </div>
      <div className="p-4 space-y-14">
        <div className="space-y-2">
          <h1 className="text-gray-400">Menu</h1>
          <div className="">
            <Link
              to="/"
              className="flex p-3 text-gray-700 space-x-4 0 hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
            >
              <DonutLargeIcon className="text-gray-300" />
              <span className=" ">Dashboard</span>
            </Link>
          </div>
          <div className="">
            <Link
              to="/students"
              className="flex p-3 text-gray-700 space-x-4 0 hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
            >
              <ClearAllIcon className="text-gray-300" />
              <span className="text-gray-600  ">Students</span>
            </Link>
          </div>
          <div className="">
            <Link
              to="/course-advisors"
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
            >
              <FormatListBulletedIcon className="text-gray-300" />
              <span className="text-gray-600">Course Advisers</span>
            </Link>
          </div>
          <div className="">
            <Link
              to="/departments"
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
            >
              <DvrIcon className="text-gray-300" />
              <span className="text-gray-600">Departments</span>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-gray-400">Add</h1>
          <div className="">
            <Link
              to="/add-student"
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
            >
              <GroupAddIcon className="text-gray-300" />
              <span className="text-gray-600  ">Add Students</span>
            </Link>
          </div>
          <div className="">
            <Link
              to="/add-department"
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
            >
              <PostAddIcon className="text-gray-300" />
              <span className="text-gray-600  ">Add Department</span>
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
              <PowerSettingsNewIcon className="text-gray-300" />
              <span className="text-gray-600  " onClick={logout}>
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
