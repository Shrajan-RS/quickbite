import toast from "react-hot-toast";

const emailFormat = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const notifyError = (message) =>
  toast.error(message, {
    style: {
      color: "white",
      textAlign: "center",
      textTransform: "capitalize",
      backgroundColor: "#ff4d2d",
    },
    iconTheme: {
      primary: "white",
      secondary: "#ff4d2d",
    },
  });

export const validateAllFields = ({
  fullName = null,
  email = null,
  password = null,
  mobileNumber = null,
}) => {
  if (!fullName || fullName.trim() === "")
    return notifyError("Full Name Is Required");

  if (fullName.length < 3)
    return notifyError("Full Name Must Be At Least 3 Characters Long!");

  if (!email || email.trim() === "") return notifyError("Email Is Required");
  if (!emailFormat.test(email)) return notifyError("Invalid Email Format!");

  if (!password || password.trim() === "")
    return notifyError("Password Is Required");
  if (password.length < 6)
    return notifyError("Password Must Be At Least 6 Characters Long!");

  if (!mobileNumber || mobileNumber.trim() === "")
    return notifyError("Mobile Number Is Required");

  if (mobileNumber.length !== 10) return notifyError("Invalid Mobile Number!");

  return null;
};

export const validateEmail = ({ email }) => {
  if (!email || email.trim() === "") return notifyError("Email Is Required");
  if (!emailFormat.test(email)) return notifyError("Invalid Email Format!");
};

export const validatePassword = ({ password }) => {
  if (!password || password.trim() === "")
    return notifyError("Password Is Required");
  if (password.length < 6)
    return notifyError("Password Must Be At Least 6 Characters Long!");
};

export const validateEmailPassword = ({ email, password }) => {
  if (!email || email.trim() === "") return notifyError("Email Is Required");
  if (!emailFormat.test(email)) return notifyError("Invalid Email Format!");

  if (!password || password.trim() === "")
    return notifyError("Password Is Required");
  if (password.length < 6)
    return notifyError("Password Must Be At Least 6 Characters Long!");

  return null;
};
