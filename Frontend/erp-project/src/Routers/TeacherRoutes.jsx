import { Route } from "react-router-dom";

import ProtectedRoute
from "./ProtectedRoute";

import TeacherLayout
from "../layouts/TeacherLayout";

import Dashboard
from "../pages/teacher/Dashboard";

import Notes
from "../pages/teacher/Notes";

import Assignments
from "../pages/teacher/Assignments";

import Submissions
from "../pages/teacher/Submissions";

const TeacherRoutes = (

<Route
  path="/teacher"
  element={
    <ProtectedRoute
      allowedRoles={[
        "Teacher"
      ]}
    >
      <TeacherLayout />
    </ProtectedRoute>
  }
>

  <Route
    index
    element={<Dashboard />}
  />

  <Route
    path="notes"
    element={<Notes />}
  />

  <Route
    path="assignments"
    element={<Assignments />}
  />

  <Route
    path="submissions"
    element={<Submissions />}
  />

</Route>

);

export default TeacherRoutes;