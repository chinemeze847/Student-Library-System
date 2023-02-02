import UserAvatar from "../../images/play.png";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate("/landing");
  };

  return (
    <div className=" bg-white">
      <div className=" flex justify-between items-center py-3 px-32">
        <Link to="/dashboard" className="text-lg font-semibold text-blue-600">
          Student Library
        </Link>

        <div className="flex space-x-1 text-gray-400 mr-3 cursor-pointer">
          <PowerSettingsNewIcon />
          <p className="text-gray-600 font-semibold" onClick={logoutUser}>
            Logout
          </p>
        </div>
      </div>
      <hr className="bg-gray-400" />
      <div className="px-32 py-3 flex justify-between items-center">
        <div className="">
          <SearchIcon className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search Here"
            className="outline-0 w-1/2 h-5"
          />
        </div>

        <div>
          <Link
            to="/dashboard/add-student"
            className="bg-blue-500 ml-2 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Add Student
          </Link>
          <Link
            to="/dashboard/students"
            className="bg-blue-500 ml-2 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            View Students
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
