import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import parser from "html-react-parser";

const StatCard = ({ icon, title, total }) => {
  const icons = [
    <PeopleAltIcon className="text-red-500 text-4xl" />,
    <CalendarTodayIcon className="text-red-500 text-4xl" />,
  ];

  return (
    <div className="bg-white w-6/12 rounded-md flex flex-col gap-2 items-center justify-center py-8">
      <div
        className="rounded-full h-20 w-20 flex items-center justify-center"
        style={{ background: "#e1ecf0" }}
      >
        {icons[icon]}
      </div>

      <h3 className="text-bold text-gray-500">{title}</h3>
      <p>
        {total} {title.toLowerCase()}(s)
      </p>
      
    </div>
  );
};

export default StatCard;
