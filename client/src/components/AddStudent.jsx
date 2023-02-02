import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import countries from "../lib/countries.min.json";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import * as ACTIONS from "../context/actions";
import { PaperClipIcon } from "@heroicons/react/20/solid";

const initState = {
  firstname: "",
  lastname: "",
  gender: "",
  country: "",
  state: "",
  streetAddress: "",
  avatar: "",
  department: "",
  regNum: "",
  entryYear: "",
  studentType: "",
  modeOfEntry: "",
  admissionLetter: "",
  email: "",
};

const AddStudent = () => {
  const [input, setInput] = useState(initState);
  const [avatarFile, setAvatarFile] = useState("");
  const [docFile, setDocFile] = useState("");
  const [departments, setDepartments] = useState([]);
  const { getDepartment, dispatch, addStudent } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      const departmentDoc = await getDepartment();

      setDepartments(departmentDoc.departments);
    };

    getData();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const avatarData = new FormData();
    avatarData.append("file", avatarFile);
    avatarData.append("upload_preset", "upload");

    const docData = new FormData();
    docData.append("upload_preset", "upload");
    docData.append('tags', ' mobile_upload Docx');
    docData.append("resource_type", "raw");
    docData.append("file", docFile);

    try {
      const avatarUploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/counselokpabi/image/upload",
        avatarData
      );
      const DocUploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/counselokpabi/raw/upload/",
        docData
      );

      const { url: avatarUrl } = avatarUploadRes.data;
      const { url: docUrl } = DocUploadRes.data;

      const newStudent = {
        ...input,
        avatar: avatarUrl,
        admissionLetter: docUrl,
      };

      const {
        firstname,
        lastname,
        gender,
        country,
        state,
        streetAddress,
        avatar,
        department,
        regNum,
        entryYear,
        studentType,
        modeOfEntry,
        admissionLetter,
        email,
      } = newStudent;

      if (
        !firstname ||
        !lastname ||
        !gender ||
        !country ||
        !state ||
        !streetAddress ||
        !avatar ||
        !admissionLetter ||
        !department ||
        !regNum ||
        !entryYear ||
        !studentType ||
        !modeOfEntry ||
        !email
      ) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: { msg: "Please input all Fields" },
        });
        return;
      }

      const res = await addStudent(newStudent);

      if (res) {
        dispatch({
          type: ACTIONS.SUCCESS_MSG,
          payload: { msg: "Student Created Successfully" },
        });
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.message },
      });
    }

    setInput(initState);
    setDocFile("")
    setAvatarFile("")
  };

  return (
    <>
      {input && (
        <>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900">
                      Personal Information
                    </h3>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="firstname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            autoComplete="given-name"
                            value={input.firstname}
                            onChange={handleInputChange}
                            className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="lastname"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            value={input.lastname}
                            onChange={handleInputChange}
                            autoComplete="family-name"
                            className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className=" grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            value={input.email}
                            onChange={handleInputChange}
                            id="email"
                            autoComplete="email"
                            className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={input.phone}
                            onChange={handleInputChange}
                            id="phone"
                          
                            className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={input.country}
                            onChange={handleInputChange}
                            autoComplete="country-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="">Select Country</option>
                            {Object.keys(countries).map((country, index) => (
                              <option
                                value={country}
                                key={`${country}-${index}`}
                              >
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-700"
                          >
                            State
                          </label>
                          <select
                            id="state"
                            name="state"
                            autoComplete="state-name"
                            value={input.state}
                            onChange={handleInputChange}
                            disabled={!input.country}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="">Select state</option>
                            {input.country &&
                              countries[`${input.country}`].map((state, index) => (
                                <option value={state} key={`${state}-${index}`}>
                                  {state}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                          <label
                            htmlFor="streetAddress"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Street Address
                          </label>
                          <input
                            type="text"
                            name="streetAddress"
                            id="streetAddress"
                            value={input.streetAddress}
                            onChange={handleInputChange}
                            autoComplete="address-level1"
                            className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Gender
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            value={input.gender}
                            onChange={handleInputChange}
                            autoComplete="gender-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Photo
                        </label>
                        <div className="mt-1 flex items-center">
                          <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            {avatarFile ? (
                              <img
                                src={URL.createObjectURL(avatarFile)}
                                alt="avatar"
                                className=""
                              />
                            ) : (
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            )}
                          </span>

                          <div className="">
                            <label
                              htmlFor="avatar"
                              className="cursor-pointer ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Change:{" "}
                              <DriveFolderUploadOutlinedIcon className="icon" />
                            </label>
                            <input
                              type="file"
                              id="avatar"
                              onChange={(e) => setAvatarFile(e.target.files[0])}
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200" />
                </div>
              </div>

              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4  sm:px-0">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900">
                      Educational Information
                    </h3>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="department"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Department
                          </label>
                          <select
                            id="department"
                            name="department"
                            value={input.department}
                            onChange={handleInputChange}
                            autoComplete="department-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="">Select Department</option>
                            {departments &&
                              departments.map((department) => (
                                <option
                                  key={department._id}
                                  value={department._id}
                                >
                                  {department.abbrevation}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="regNum"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Registration Number
                          </label>
                          <input
                            type="text"
                            name="regNum"
                            id="regNum"
                            value={input.regNum}
                            onChange={handleInputChange}
                            autoComplete="department"
                            className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className=" grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="entryYear"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Entry Year
                          </label>
                          <input
                            type="text"
                            name="entryYear"
                            value={input.entryYear}
                            onChange={handleInputChange}
                            id="entryYear"
                            autoComplete="entryYear"
                            className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="studentType"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Student type
                          </label>
                          <select
                            id="studentType"
                            name="studentType"
                            value={input.studentType}
                            onChange={handleInputChange}
                            autoComplete="studentType"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="">Select Type</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Post-graduate">Post graduate</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="modeOfEntry"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Mode of Entry
                          </label>
                          <select
                            id="modeOfEntry"
                            name="modeOfEntry"
                            autoComplete="modeOfEntry"
                            value={input.modeOfEntry}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="">Select Mode</option>
                            <option value="UTME">UTME</option>
                            <option value="Direct Entry (DE)">
                              Direct Entry
                            </option>
                            <option value="Pre-Degree">Pre-Degree</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Admission Letter
                        </label>
                        {!docFile ? (
                          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="admissionLetter"
                                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="admissionLetter"
                                    name="admissionLetter"
                                    type="file"
                                    onChange={(e) =>
                                      setDocFile(e.target.files[0])
                                    }
                                    className="sr-only"
                                  />
                                </label>
                                
                              </div>

                              <p className="text-xs text-gray-500">
                                PDF up to 1MB
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex w-full mt-3 flex-1 items-center">
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-2 w-0 flex-1 truncate">
                              Admission_Letter.pdf
                            </span>

                            <svg
                              className="fill-current h-6 w-6 text-red-500 flex-1"
                              role="button"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              onClick={() => setDocFile("")}
                            >
                              <title>Remove</title>
                              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:grid md:grid-cols-3 md:gap-6 mt-5 ">
                <div className="md:col-span-1"></div>
                <div className="bg-gray-50 px-4 py-3 md:col-span-2 md:mt-0 flex items-center justify-center sm:px-6">
                  <button
                    type="submit"
                    className="flex w-3/4  justify-center py-2 px-3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AddStudent;
