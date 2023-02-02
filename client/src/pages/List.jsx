import React, { useEffect } from "react";
import { CourseAdvisorsList, DepartmentList, StudentList } from "../components";
import { useAppContext } from "../context/AppContext";

const List = ({ studentsRoute, departmentsRoute, advisor, advisorRoute }) => {
  const {
    getStudents,
    students,
    departments,
    getDepartment,
    advisors,
    getAdvisors,
    searchDepartment,
    searchEntryYear,
    search,
    sort,
  } = useAppContext();

  useEffect(() => {
    if (students) {
      getStudents();
    }
  }, [searchDepartment, searchEntryYear, search, sort]);

  useEffect(() => {
    if (departments) {
      getDepartment();
    }
  }, []);

  useEffect(() => {
    if (advisorRoute) {
      getAdvisors();
    }
  }, []);

  return (
    <div className="p-8">
      {studentsRoute ? (
        <StudentList students={students} advisor={advisor} />
      ) : departmentsRoute ? (
        <DepartmentList departments={departments} />
      ) : (
        <CourseAdvisorsList advisors={advisors} />
      )}
    </div>
  );
};

export default List;
