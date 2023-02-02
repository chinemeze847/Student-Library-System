import React, { useState } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import * as ACTIONS from "../context/actions";

const Header = () => {
  const { logout, dispatch, getStudents } = useAppContext();

  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate("/landing");
  };


  return (
    <div className="flex shadow-sm bg-gray-50 items-center px-8 md:gap-64 py-1 justify-between h-16">
      <div className="flex flex-1 items-center justify-between relative rounded shadow-sm bg-white text-base"></div>

      <div className="flex space-x-1 text-gray-400 mr-3 cursor-pointer">
        <PowerSettingsNewIcon />
        <p className="text-gray-600 font-semibold" onClick={logoutUser}>
          Logout
        </p>
      </div>
    </div>
  );
};

export default Header;
