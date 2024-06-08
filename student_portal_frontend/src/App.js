import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/Login";
import { UserProvider } from "./contexts/userContext";
import Success from "./components/Success";

const App = () => (
  <UserProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/student-form" element={<StudentForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/success" element={<Success />} />
        </Route>
        <Route path="/" exact element={<Login />} />
      </Routes>
    </Router>
  </UserProvider>
);

export default App;
