import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../redux/user.slice";

function useGetUserCity() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );

      const { city, country, state, postcode } = response.data.address;

      const address = `${city}-${postcode}, ${state}, ${country}`;

      dispatch(setCity(address));
    });
  }, [userData]);
}

export default useGetUserCity;
