import React from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import SearchContainer from "./SearchContainer";

const StudentList = ({ students, advisor }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="mx-5 my-2">
        <div className="flex items-center justify-between mb-5 ">
          <h2 className="text-3xl text-gray-600"> Students</h2>
          <Link to={advisor ? `/dashboard/add-student` : `/add-student`}>
            <button className="bg-blue-500 ml-2 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Add Students
            </button>
          </Link>
        </div>

        <SearchContainer />
      </div>

      <table className="w-full  text-base text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-5 px-6">
              Image
            </th>
            <th scope="col" className="py-5 px-6">
              Firstname
            </th>
            <th scope="col" className="py-5 px-6">
              Lastname
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
          {students?.students?.map((item) => (
            <tr
              key={item._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="py-2 flex gap-2 text-lg items-center px-6 font-medium text-gray-800 whitespace-nowrap dark:text-white">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-12 w-12 object-contain rounded-full"
                />{" "}
              </td>
              <td scope="row" className="py-2 px-6">
                {item.firstname}
              </td>
              <td className="py-2 px-6">{item.lastname}</td>
              <td className="py-2 px-6">{item.regNum}</td>
              <td className="py-2 px-6">{item.department}</td>
              <td className="py-2 px-6">{item.entryYear}</td>
              <td className="py-2 px-6">
                <Link
                  to={
                    advisor
                      ? `/dashboard/student/${item._id}`
                      : `/student/${item._id}`
                  }
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

      {students.numOfPages > 1 ? <Pagination /> : null}
    </div>
  );
};

export default StudentList;
