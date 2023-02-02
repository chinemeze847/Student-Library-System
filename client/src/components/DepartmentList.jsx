import React from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const DepartmentList = ({ departments }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="mx-5 my-2">
        <div className="flex items-center justify-between mb-5 ">
          <h2 className="text-3xl text-gray-600">Departments</h2>
          <button className="bg-blue-500 ml-2 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Add Department
          </button>
        </div>
      </div>

      <table className="w-full text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-5 px-6">
              Name
            </th>
            <th scope="col" className="py-5 px-6">
              Code
            </th>

            <th scope="col" className="py-5 px-6 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {departments?.departments?.map((item) => (
            <tr
              key={item._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="py-2 flex gap-2 text-lg items-center px-6 font-medium text-gray-800 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>
              <td className="py-2 px-6">{item.abbrevation}</td>

              <td className="py-2 px-6 flex items-center justify-between">
                <Link
                  to={`/departments/${item._id}`}
                  className="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  View Students
                </Link>

                <span className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {departments.numOfPages > 1 ? <Pagination /> : null}
    </div>
  );
};

export default DepartmentList;
