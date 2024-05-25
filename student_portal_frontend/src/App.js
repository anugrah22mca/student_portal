// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/Login";
import { UserProvider } from "./contexts/userContext";

const App = () => (
  <UserProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" exact element={<Login />} />
      </Routes>
    </Router>
  </UserProvider>
);

export default App;
