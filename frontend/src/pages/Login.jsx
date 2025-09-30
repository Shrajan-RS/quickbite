import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

import { serverURI } from "../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const userNavigate = useNavigate();
  const notify = (message) => toast.success(message);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${serverURI}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      notify("Logged In successfully!");

      setEmail("");
      setPassword("");

      setTimeout(() => {
        userNavigate("/");
      }, 2000);

      console.log(response);
    } catch (error) {
      console.log(error);
      notify(error.response.data.message || "Something went wrong!");
    }
  };

  return (
    <>
      <section
        className="min-h-screen w-full flex items-center justify-center p-4"
        style={{ background: "#fff9f6" }}
      >
        <div
          className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] border-[#ddd]`}
        >
          <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d] uppercase text-center">
            QuickBite
          </h1>
          <p className="text-gray-600 mb-8 text-center capitalize">
            Login to your account to get started with delicious food on your
            door steps
          </p>

          {/* email */}

          <div className="mb-4 ">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full border-[1px] border-[#ddd] rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter Your Email"
            />
          </div>

          {/* password */}

          <div className="mb-4 ">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                className="w-full border-[1px] border-[#ddd] rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter Your Password"
              />
              <button
                className="absolute right-3 top-[14px] text-gray-500 cursor-pointer"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>

          <div className="text-right mb-4 hover:text-[#ff4d2d] hover:underline">
            <Link to={"/forgot-password"}>forgot password</Link>
          </div>

          <button
            className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e02909]"
            onClick={handleLogin}
          >
            Login
          </button>

          <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100">
            <FcGoogle size={20} />
            <span>Login With Google</span>
          </button>
          <p className="text-center mt-4">
            Want to create an account ?{" "}
            <Link to={"/signup"}>
              <span className="text-orange-500 cursor-pointer hover:underline">
                SignUp
              </span>
            </Link>{" "}
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;
