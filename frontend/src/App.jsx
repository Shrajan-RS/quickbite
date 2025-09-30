import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/ForgotPassword";

export const serverURI = "http://localhost:7000";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
