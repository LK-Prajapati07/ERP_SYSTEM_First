import { Route } from "react-router-dom";

import ProtectedRoute
from "./ProtectedRoute";

import AdminLayout
from "../layouts/AdminLayout";

import Dashboard
from "../pages/admin/Dashboard";

import Students
from "../pages/admin/Students";

import Teachers
from "../pages/admin/Teachers";

import Subjects
from "../pages/admin/Subjects";

const AdminRoutes = (

<Route
  path="/admin"
  element={
    <ProtectedRoute
      allowedRoles={[
        "Admin"
      ]}
    >
      <AdminLayout />
    </ProtectedRoute>
  }
>

  <Route
    index
    element={<Dashboard />}
  />

  <Route
    path="students"
    element={<Students />}
  />

  <Route
    path="teachers"
    element={<Teachers />}
  />

  <Route
    path="subjects"
    element={<Subjects />}
  />

</Route>

);

export default AdminRoutes;