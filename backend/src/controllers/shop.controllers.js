import uploadImageToCloudinary from "../../services/cloudinary.js";
import { Shop } from "../models/shop.model.js";

export const createAndEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;
    if (req.file) {
      image = await uploadImageToCloudinary(req.file.path);
    }

    let shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });
    } else {
      shop = await Shop.findByIdAndUpdate(
        shop._id,
        {
          name,
          city,
          state,
          address,
          image,
          owner: req.userId,
        },
        { new: true }
      );
    }

    await shop.populate("owner");
    return res
      .status(201)
      .json({ message: "Shop Created Successfully!", shop });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create shop from shop controller: ", error });
  }
};

// export const createShop = async (req,res) => {}
// export const createShop = async (req,res) => {}
// export const createShop = async (req,res) => {}
