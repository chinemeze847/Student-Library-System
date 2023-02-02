import React from "react";
import { AddDepartment, AddStudent } from "../components";

const Add = ({ department }) => {
  return (
    <div className="p-8">
      {!department && <AddStudent />}
      {department && <AddDepartment />}
    </div>
  );
};

export default Add;
