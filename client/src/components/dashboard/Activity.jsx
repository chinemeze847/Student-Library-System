import React from "react";
import { Link } from "react-router-dom";
import AvatarImg from "../../images/ms.png";

const Activity = ({ students }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <h2 className="text-xl font-bold text-gray-600 mb-5 text-center">
        Latest Submission
      </h2>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-5 px-6">
              Image
            </th>
            <th scope="col" className="py-5 px-6">
              Student Name
            </th>
            <th scope="col" className="py-5 px-6">
              Reg Number
            </th>
            <th scope="col" className="py-5 px-6">
              Department
            </th>
            <th scope="col" className="py-5 px-6">
              Year of Entry
            </th>
            <th scope="col" className="py-5 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {students?.students?.slice(0, 3).map((item) => (
            <tr
              key={item._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="py-2 px-6">
                <img
                  src={item.avatar}
                  alt={item.firstname}
                  className="h-12 w-12 object-contain rounded-full"
                />
              </td>
              <td className="py-2 flex gap-2 text-base items-center px-6 font-medium text-gray-800 whitespace-nowrap dark:text-white">
                {item.firstname}{" "}{item.lastname}
              </td>
              <td className="py-2 px-6">{item.regNum}</td>
              <td className="py-2 px-6">{item.department}</td>
              <td className="py-2 px-6">{item.entryYear}</td>
              <td className="py-2 px-6">
                <Link
                  to={`/dashboard/student/${item._id}`}
                  className="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  View
                </Link>

                <span className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activity;
