import React, { useEffect } from "react";
import axios from "axios";
import { serverURI } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/user.slice";

function useGetCurrentUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const serverResponse = await axios.get(
          `${serverURI}/api/user/current`,
          { withCredentials: true }
        );

        dispatch(setUserData(serverResponse.data));
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchUser();
  }, []);
}

export default useGetCurrentUser;
