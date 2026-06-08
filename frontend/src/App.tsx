import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectTask from "./pages/ProjectTask";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/projects/:id" element={<ProjectTask/>}/>

        {/* default to login */}
        <Route path="*" element={<Navigate to="/login"/>}/>
      </Routes>
    </BrowserRouter>
  );
}