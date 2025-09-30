import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [step, SetStep] = useState(1);

  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
            <button className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e02909] capitalize">
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
                type="email"
                id="otp"
                className="w-full border-[1px] border-[#ddd] rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter OTP"
              />
            </div>
            <button className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e02909] capitalize">
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
                name="new-password"
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
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="text"
                id="confirm-password"
                className="w-full border-[1px] border-[#ddd] rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Confirm Password"
              />
            </div>
            <button className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e02909] capitalize">
              reset password
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ForgotPassword;
