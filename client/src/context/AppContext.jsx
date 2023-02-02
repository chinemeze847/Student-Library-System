import axios from "axios";
import { useContext, createContext, useReducer } from "react";
import reducer from "./reducer";
import * as ACTIONS from "./actions";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

export const initialState = {
  user: user || null,
  token: token || null,
  students: {},
  departments: {},
  advisors: {},
  numOfPages: 1,
  page: 1,
  stats: [],
  monthlyApplications: [],
  search: "",
  searchDepartment: "all",
  searchEntryYear: "all",
  sort: "latest",
  sortOptions: [
    { _id: "latest" },
    { _id: "oldest" },
    { _id: "a-z" },
    { _id: "z-a" },
  ],
  errorMessage: "",
  successMessage: "",
  isLoading: false,
  studentsStats: {},
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Instance Setup
  const authFetch = axios.create({
    baseURL: "/api/",
  });

  //request Interceptor
  authFetch.interceptors.request.use(
    (config) => {
      dispatch({ type: ACTIONS.FETCH_START });
      config.headers.Authorization = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      dispatch({ type: ACTIONS.FETCH_STOP });
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      dispatch({ type: ACTIONS.FETCH_STOP });
      return response;
    },
    (error) => {
      dispatch({ type: ACTIONS.FETCH_STOP });
      const err = error.response;
      // console.log(err);

      if (err.status === 401 || err.status === 500) {
        logout();
        dispatch({ type: ACTIONS.INIT_STATE });
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const getStudents = async () => {
    try {
      const { searchDepartment, searchEntryYear, search, sort, page } = state;
      let url = `/students?department=${searchDepartment}&entryYear=${searchEntryYear}&sort=${sort}&page=${page}`;
      if (search) {
        url = url + `&search=${search}`;
      }
      const res = await authFetch.get(url);
      dispatch({ type: ACTIONS.SET_STUDENTS, payload: { students: res.data } });

      return res.data;
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getStudentsStats = async () => {
    try {
      const res = await authFetch.get("/students/stats");
      dispatch({
        type: ACTIONS.SET_ENTRY_YEAR,
        payload: { entryYears: res.data },
      });
      return res.data;
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getSingleStudent = async (id) => {
    try {
      const res = await authFetch.get(`/students/${id}`);

      return res.data;
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getAdvisors = async () => {
    try {
      const res = await authFetch.get("/advisors");
      dispatch({ type: ACTIONS.SET_ADVISORS, payload: { advisors: res.data } });

      return res.data;
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getDepartment = async () => {
    try {
      const res = await authFetch.get("/departments");
      dispatch({
        type: ACTIONS.SET_DEPARTMENTS,
        payload: { departments: res.data },
      });
      return res.data;
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getDepartmentStudents = async (departmentId) => {
    try {
      const res = await authFetch.get(`/students/department/${departmentId}`);

      return res.data;
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getStats = async () => {
    try {
      const departments = await getDepartment();
      const studentsStats = await getStudentsStats();
      const advisors = await getAdvisors();
      const students = await getStudents();

      const stats = [
        {
          title: "STUDENT",
          total: students.totalStudents,
        },
        {
          title: "COURSE ADVISOR",
          total: advisors.totalAdvisors,
        },
        {
          title: "DEPARTMENT",
          total: departments.totalDepartments,
        },
        {
          title: "ENTRY YEAR",
          total: studentsStats.defaultStats.length,
        },
      ];

      dispatch({ type: ACTIONS.SET_STATS, payload: { stats } });
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const getAdvisorStats = async () => {
    try {
      const studentsStats = await getStudentsStats();
      const students = await getStudents();

      const stats = [
        {
          title: "STUDENT",
          total: students.totalStudents,
        },

        {
          title: "ENTRY YEAR",
          total: studentsStats.defaultStats.length,
        },
      ];

      dispatch({ type: ACTIONS.SET_STATS, payload: { stats } });
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const login = async (data) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const res = await axios.post("/api/auth/login", data);
      const { advisor: user, token } = res.data;

      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user,
          token,
        },
      });

      addUserToLocalStorage({ user, token });
      dispatch({ type: ACTIONS.FETCH_STOP });
      return user;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_STOP });
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const deleteAdivsor = async () => {};

  const addStudent = async (student) => {
    try {
      const res = await authFetch.post("/students", student);
      return res.data.student;
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const addDepartment = async (department) => {
    try {
      const res = await authFetch.post("/departments", department);
      return res.data.department;
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const addAdvisor = async (advisor) => {
    try {
      const res = await authFetch.post("/auth/register", advisor);
      addUserToLocalStorage({ user, token });
      return res.data.advisor;
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const logout = () => {
    dispatch({ type: ACTIONS.LOGOUT });
    removeUserFromLocalStorage();
  };

  const handleInputChange = (name, value) => {
    dispatch({ type: ACTIONS.HANDLE_CHANGE, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS });
  };

  const clearMessage = () => {
    dispatch({ type: ACTIONS.CLEAR_MESSAGE });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        getStats,
        login,
        getDepartment,
        getAdvisors,
        getStudents,
        getStudentsStats,
        getSingleStudent,
        getDepartmentStudents,
        logout,
        clearMessage,
        addStudent,
        addAdvisor,
        getAdvisorStats,
        clearFilters,
        handleInputChange,
        addDepartment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
