import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

import { serverURI } from "../App";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [role, setRole] = useState("user");

  const [showPassword, setShowPassword] = useState(false);

  const userNavigate = useNavigate();
  const notify = (message) => toast.success(message);

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${serverURI}/api/auth/signup`,
        {
          fullName,
          email,
          password,
          mobileNumber,
          role,
        },
        { withCredentials: true }
      );

      notify("Account created successfully!");

      setFullName("");
      setEmail("");
      setPassword("");
      setMobileNumber("");
      setRole("");

      setTimeout(() => {
        notify("Redirecting To Login Page!");
      }, 3000);

      setTimeout(() => {
        userNavigate("/login");
      }, 4500);

      console.log(response);
    } catch (error) {
      console.log(error);
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
          <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d] uppercase">
            QuickBite
          </h1>
          <p className="text-gray-600 mb-8 capitalize">
            create your account to get started with delicious food on your door
            steps
          </p>

          {/* fullName */}

          <div className="mb-4 ">
            <label
              htmlFor="fullName"
              className="block text-gray-700 font-medium mb-1"
            >
              Full Name
            </label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              name="fullName"
              type="text"
              id="fullName"
              className="w-full border-[1px] border-[#ddd] rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter Your Full Name"
            />
          </div>

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

          {/* mobile */}

          <div className="mb-4 ">
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-medium mb-1"
            >
              Mobile
            </label>
            <input
              required
              name="mobile"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              type="text"
              id="mobile"
              className="w-full border-[1px] border-[#ddd] rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter Your Mobile Number"
            />
          </div>

          {/* Role */}

          <div className="mb-4 ">
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-1"
            >
              Role
            </label>
            <div className="flex gap-2">
              {["user", "owner", "deliveryBoy"].map((option) => (
                <button
                  key={option}
                  className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                  onClick={() => setRole(option)}
                  style={
                    role === option
                      ? {
                          backgroundColor: "#ff4d2d",
                          color: "white",
                          border: "1px solid orange",
                        }
                      : {}
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <button
            className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e02909]"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100">
            <FcGoogle size={20} />
            <span>Sign Up With Google</span>
          </button>
          <p className="text-center mt-4">
            Already have an account ?{" "}
            <Link to={"/login"}>
              <span className="text-orange-500 cursor-pointer hover:underline">
                Login
              </span>
            </Link>{" "}
          </p>
        </div>
      </section>
    </>
  );
}

export default SignUp;
