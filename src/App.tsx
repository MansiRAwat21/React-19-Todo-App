import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
// import FormTodo from './components/FormTodo'
import Header from "./components/todo/Header";
// import ListContainer from './components/ListContainer'
// import StatsCards from './components/StatsCards'
import Login from "./pages/LoginForm";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AuthRoute from "./context/AuthRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route path="/signup" element={<AuthRoute>
          <Signup />
        </AuthRoute>} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route
          path="*"
          element={<div className="text-center mt-10">Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
