import React from "react";
import { useSelector } from "react-redux";
import UserDashBoard from "../components/UserDashBoard";
import OwnerDashboard from "../components/OwnerDashboard";
import Navbar from "../components/Navbar";

function HomePage() {
  const userData = useSelector((state) => state.user?.userData?.user);

  return (
    <div className="w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]">
      <Navbar />

      {userData.role === "user" && <UserDashBoard />}
      {userData.role === "owner" && <OwnerDashboard />}
      {userData.role === "deliveryBoy" && <UserDashBoard />}
    </div>
  );
}

export default HomePage;
