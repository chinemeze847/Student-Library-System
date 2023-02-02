import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const data = [
  {
    id: 1,
    name: "Joseph Joe",
    regNumber: "20171035175",
    department: "Computer Science",
    enryYear: "2017/2018",
  },
  {
    id: 1,
    name: "Tom Robinsom",
    regNumber: "20171034175",
    department: "Agric Science",
    enryYear: "2017/2018",
  },
  {
    id: 1,
    name: "Anna James",
    regNumber: "20171033175",
    department: "Biological Science",
    enryYear: "2017/2018",
  },
];

const RightBar = () => {
  const { students } = useAppContext();
  return (
    <>
      {students.students ? (
        <div className="bg-white  w-5/12 rounded-xl border border-gray-100">
          <div className="border-b flex justify-between items-center p-3 border-gray-100">
            <p className="font-semibold  ">Latest Submission </p>
            <Link to="/students" className="">
              See All
            </Link>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-5 px-6">
                  Department
                </th>
                <th scope="col" className="py-5 px-6">
                  Reg Number
                </th>

                <th scope="col" className="py-5 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students.students?.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-2 px-6">{item.department}</td>
                  <td className="py-2 px-6">{item.regNum}</td>

                  <td className="py-2 px-6">
                    <Link
                      to={`/student/${item._id}`}
                      className="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        "LOADING..."
      )}
    </>
  );
};

export default RightBar;
