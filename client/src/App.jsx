import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DepartmentStudents } from "./components";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import {
  AdminHome,
  Login,
  List,
  SharedLayout,
  Landing,
  View,
  Add,
  Register,
} from "./pages";
import Dashboard from "./pages/Dashboard";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdvisorProtectedRoute from "./routes/AdvisorProtectedRoute";
import UserRedirect from "./routes/UserRedirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AdminProtectedRoute>
              <SharedLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="students" element={<List studentsRoute={true} />} />
          <Route
            path="departments"
            element={<List departmentsRoute={true} />}
          />
          <Route path="departments/:id" element={<DepartmentStudents />} />
          <Route
            path="course-advisors"
            element={<List advisorRoute={true} />}
          />
          <Route path="student/:id" element={<View />} />
          <Route path="add-student" element={<Add />} />
          <Route path="add-department" element={<Add department={true} />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <AdvisorProtectedRoute>
              <DashboardLayout />
            </AdvisorProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="students"
            element={<List studentsRoute={true} advisor />}
          />
          <Route path="student/:id" element={<View />} />
          <Route path="add-student" element={<Add />} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route
          path="/login"
          element={
            <UserRedirect>
              <Login />
            </UserRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <UserRedirect>
              <Register />
            </UserRedirect>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
