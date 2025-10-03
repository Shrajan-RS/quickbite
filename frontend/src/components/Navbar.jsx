import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverURI } from "../App";

import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { setUserData } from "../redux/user.slice";
import toast from "react-hot-toast";

function Navbar() {
  const userData = useSelector((state) => state.user?.userData?.user);
  const city = useSelector((state) => state.user?.city);

  const [userInfo, setUserInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const response = await axios.get(`${serverURI}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success("Logged Out Successfully!");
    } catch (error) {
      console.log("Log Out Error: ", error);
    }
  };

  return (
    <div className="w-full h-[80px] capitalize flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      {showSearch && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%] md:hidden">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] text-gray-600 truncate">{city}</div>
          </div>

          <div className="w-[80%] flex items-center gap-[10px]">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search Delicious Food!"
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">QuickBite</h1>
      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] md:flex hidden">
        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
          <FaLocationDot size={25} className="text-[#ff4d2d]" />
          <div className="w-[80%] text-gray-600 truncate">{city}</div>
        </div>

        <div className="w-[80%] flex items-center gap-[10px]">
          <IoIosSearch size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search Delicious Food!"
            className="px-[10px] text-gray-700 outline-0 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        {showSearch ? (
          <IoClose
            size={25}
            className="text-[#ff4d2d] md:hidden"
            onClick={() => setShowSearch(false)}
          />
        ) : (
          <IoIosSearch
            size={25}
            className="text-[#ff4d2d] md:hidden"
            onClick={() => setShowSearch(true)}
          />
        )}

        <div className="relative cursor-pointer capitalize">
          <BsCart4 size={25} className="text-[#ff4d2d]" />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
            0
          </span>
        </div>

        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
          My Orders
        </button>

        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setUserInfo((prev) => !prev)}
        >
          {userData?.fullName.slice(0, 1).toUpperCase()}
        </div>

        {userInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[20%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold flex justify-center">
              {userData?.fullName.toUpperCase()}
            </div>

            <div className="capitalize md:hidden text-[#ff4d2d] font-semibold cursor-pointer flex justify-center">
              My orders
            </div>

            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer hover:bg-[#ff4d2d]/10 duration-200 flex justify-center"
              onClick={handleLogOut}
            >
              LogOut
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
