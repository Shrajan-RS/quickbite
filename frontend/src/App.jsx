import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";

import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetUserCity from "./hooks/useGetUserCity";

export const serverURI = "http://localhost:7000";

function App() {
  useGetCurrentUser();
  useGetUserCity();

  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/"
          element={userData ? <HomePage /> : <Navigate to={"/signup"} />}
        />
      </Routes>
    </>
  );
}

export default App;
