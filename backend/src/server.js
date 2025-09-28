import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/DB.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server Is Listening On PORT: ${PORT} \n URL: http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => console.log("Error: Failed To Run The Sever!! \n" + error));
