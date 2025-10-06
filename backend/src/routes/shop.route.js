import { Router } from "express";
import isAuth from "../middlewares/is.auth.js";
import { createAndEditShop } from "../controllers/shop.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const shopRouter = Router();

shopRouter.get(
  "/create-edit",
  isAuth,
  upload.single("image"),
  createAndEditShop
);
