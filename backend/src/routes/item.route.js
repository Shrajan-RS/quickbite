import { Router } from "express";
import isAuth from "../middlewares/is.auth.js";
import { addItem, editItem } from "../controllers/item.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const itemRouter = Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.post("/edit-item/:itemId", isAuth, upload.single("image"), editItem);
