import { Route } from "react-router-dom";

import ProtectedRoute
from "./ProtectedRoute";

import StudentLayout
from "../layouts/StudentLayout";

import Dashboard
from "../pages/student/Dashboard";

import Subjects
from "../pages/student/Subjects";

import Notes
from "../pages/student/Notes";

import Assignments
from "../pages/student/Assignments";

const StudentRoutes = (

<Route
  path="/student"
  element={
    <ProtectedRoute
      allowedRoles={[
        "Student"
      ]}
    >
      <StudentLayout />
    </ProtectedRoute>
  }
>

  <Route
    index
    element={<Dashboard />}
  />

  <Route
    path="subjects"
    element={<Subjects />}
  />

  <Route
    path="notes"
    element={<Notes />}
  />

  <Route
    path="assignments"
    element={<Assignments />}
  />

</Route>

);

export default StudentRoutes;