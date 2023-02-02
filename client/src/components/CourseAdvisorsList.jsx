import React from "react";
import Pagination from "./Pagination";

const CourseAdvisorsList = ({ advisors }) => {

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="mx-5 my-2">
        <div className="flex items-center justify-between mb-5 ">
          <h2 className="text-3xl text-gray-600">Course Advisors</h2>
        </div>
      </div>

      <table className="w-full text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-5 px-6">
              Full name
            </th>
            <th scope="col" className="py-5 px-6">
              Username
            </th>
            <th scope="col" className="py-5 px-6">
              Email
            </th>
            <th scope="col" className="py-5 px-6">
              department
            </th>
            <th scope="col" className="py-5 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {advisors?.advisors?.map((item) => (
            <tr
              key={item._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="py-2 flex gap-2 text-lg items-center px-6 font-medium text-gray-800 whitespace-nowrap dark:text-white"
              >
                {item.fullname}
              </th>
              <td className="py-2 px-6">{item.username}</td>
              <td className="py-2 px-6">{item.email}</td>
              <td className="py-2 px-6">{item.department}</td>
              <td className="py-2 px-6">
                <span className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {advisors.numOfPages > 1 ? <Pagination /> : null}
    </div>
  );
};

export default CourseAdvisorsList;
