import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import * as ACTIONS from "../context/actions";


const initState = {
 name: "",
 abbrevation: ""
};

const AddStudent = () => {
  const [input, setInput] = useState(initState);
  const { dispatch, addDepartment } = useAppContext();

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
      name,
      abbrevation
      } = input;

      if (
       !name ||
       !abbrevation 
      ) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: { msg: "Please input all Fields" },
        });
        return;
      }

      const res = await addDepartment(input);

      if (res) {
        dispatch({
          type: ACTIONS.SUCCESS_MSG,
          payload: { msg: "Department Created Successfully" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.message },
      });
    }

    setInput(initState);
 
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
                      Department Information
                    </h3>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Department Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="given-name"
                            value={input.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="abbrevation"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Department Code
                          </label>
                          <input
                            type="text"
                            name="abbrevation"
                            id="abbrevation"
                            value={input.abbrevation}
                            onChange={handleInputChange}
                            autoComplete="abbrevation"
                            className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
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
