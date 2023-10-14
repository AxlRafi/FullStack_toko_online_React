import Cart from "../models/CartModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
//untuk nampilin yg masuk ke cart dari AddCart
export const getCarts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Cart.findAll({
        attributes: ["uuid", "product_name", "qty", "price"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Cart.findAll({
        attributes: ["uuid", "product_name", "qty", "price"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Untuk EditCart
export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!cart) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Cart.findOne({
        attributes: ["uuid", "product_name", "qty", "price"],
        where: {
          id: cart.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Cart.findOne({
        attributes: ["uuid", "product_name", "qty", "price"],
        where: {
          [Op.and]: [{ id: cart.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCart = async (req, res) => {
  const { name, qty, price } = req.body;
  try {
    await Cart.create({
      product_name: name,
      qty: qty,
      price: price,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Cart Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//buat Edit saat di list
export const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!cart) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name, qty, price } = req.body;
    if (req.role === "admin") {
      await Cart.update(
        { name, qty, price },
        {
          where: {
            id: cart.id,
          },
        }
      );
    } else {
      if (req.userId !== cart.userId) return;
      res.status(403).json({ msg: "Akses terlarang" });
      await Cart.update(
        { name, qty, price },
        {
          where: {
            [Op.and]: [{ id: cart.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Cart updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Delete List di cart
export const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!cart) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name, qty, price } = req.body;
    if (req.role === "admin") {
      await Cart.destroy({
        where: {
          id: cart.id,
        },
      });
    } else {
      if (req.userId !== cart.userId) return;
      res.status(403).json({ msg: "Akses terlarang" });

      await Cart.destroy({
        where: {
          [Op.and]: [{ id: cart.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Cart deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
