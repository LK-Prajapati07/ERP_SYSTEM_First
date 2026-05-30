import Login from "@/Pages/Login";
import Register from "@/Pages/register";
import {
  Routes,
  Route
} from "react-router-dom";
import StudentRoutes from "./StudentRoutes";
import TeacherRoutes from "./TeacherRoutes";
import AdminRoutes from "./AdminRoutes";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {StudentRoutes}

      {TeacherRoutes}

      {AdminRoutes}

      <Route
        path="*"
        element={
          <div>
            404 Not Found
          </div>
        }
      />

    </Routes>
  );
};

export default AppRoutes;