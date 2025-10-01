import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { IoMdArrowRoundBack } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { IoHome } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";

import { serverURI } from "../App.jsx";
import { notifyError, validateEmail } from "../utils/validator.js";

function ForgotPassword() {
  const [step, SetStep] = useState(1);

  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userNavigate = useNavigate();

  const notifySuccess = (message) => toast.success(message);

  const notifyCustom = (message, icon) =>
    toast.success(message, {
      icon,
      duration: 1800,
    });

  const handleSendOTP = async () => {
    const errorMessage = validateEmail({ email });

    if (errorMessage) return;

    try {
      const response = await axios.post(
        `${serverURI}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );

      notifySuccess("OTP Sent Successfully!", <IoIosSend />);

      setTimeout(() => {
        SetStep(2);
      }, 1500);
    } catch (error) {
      notifyError(error.response.data.message || "Something went wrong!");
      console.log("Error: ", error);
    }
  };

  const handleVerifyOTP = async () => {
    if (!OTP || OTP.trim() === "") return notifyError("OTP Is Required!");

    try {
      const response = await axios.post(
        `${serverURI}/api/auth/verify-otp`,
        {
          email,
          OTP,
        },
        { withCredentials: true }
      );

      notifySuccess("OTP Verified Successfully!");

      setTimeout(() => {
        SetStep(3);
      }, 1500);
    } catch (error) {
      notifyError(error.response.data.message || "Failed To Verify OTP!");
      console.log("Error: ", error);
    }
  };

  const handlePasswordReset = async () => {
    if (!newPassword || newPassword.trim() === "")
      return notifyError("New Password Is Required!");

    if (!confirmPassword || confirmPassword.trim() === "")
      return notifyError("Confirm Password Is Required!");

    try {
      const response = await axios.post(
        `${serverURI}/api/auth/reset-password`,
        {
          email,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      );

      notifySuccess("Password Reset was Successfully!");

      setTimeout(() => {
        notifyCustom("Redirecting To Home Page!", <IoHome />);
      }, 1500);

      setTimeout(() => {
        userNavigate("/");
      }, 3500);
    } catch (error) {
      notifyError(error.response.data.message || "Failed To Reset Password!");
      console.log("Error: ", error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white w-full rounded-xl shadow-lg max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <Link to={"/login"}>
            <IoMdArrowRoundBack className="text-[#ff4d2d]" size={30} />
          </Link>

          <h1 className="capitalize text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot password
          </h1>
        </div>

        {step === 1 && (
          <div>
            {/* email */}

            <div className="mb-6">
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
            <button
              className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e02909] capitalize"
              onClick={handleSendOTP}
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            {/* email */}

            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                required
                name="OTP"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                type="text"
                id="otp"
                className="w-full border-[1px] border-[#ddd] rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter OTP"
              />
            </div>
            <button
              className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e02909] capitalize"
              onClick={handleVerifyOTP}
            >
              verify OTP
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="new-password"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                required
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
                id="new-password"
                className="w-full border-[1px] border-[#ddd] rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter New Password"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-gray-700 font-medium mb-1 capitalize"
              >
                confirm password
              </label>
              <input
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="text"
                id="confirm-password"
                className="w-full border-[1px] border-[#ddd] rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Confirm Password"
              />
            </div>
            <button
              className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e02909] capitalize"
              onClick={handlePasswordReset}
            >
              reset password
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ForgotPassword;
