import Sales from "../models/SalesModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
export const getSales = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Sales.findAll({
        attributes: ["uuid", "product_name", "qty", "price", "sum"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Sales.findAll({
        attributes: ["uuid", "product_name", "qty", "price", "sum"],
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
export const getSalesById = async (req, res) => {
  try {
    const sales = await Sales.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!sales) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Sales.findOne({
        attributes: ["uuid", "product_name", "qty", "price", "sum"],
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
      response = await Sales.findOne({
        attributes: ["uuid", "product_name", "qty", "price", "sum"],
        where: {
          [Op.and]: [{ id: sales.id }, { userId: req.userId }],
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
export const createSales = async (req, res) => {
  //berhubungan dengan Postman
  const { product_name, qty, price, sum } = req.body;
  console.log(product_name);
  try {
    await Sales.create({
      //berhubungan dengan database
      product_name: product_name,
      qty: qty,
      price: price,
      sum: sum,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Sales Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateSales = async (req, res) => {
  try {
    const sales = await Sales.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!sales) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name, qty, price, sum } = req.body;
    if (req.role === "admin") {
      await Sales.update(
        { name, qty, price, sum },
        {
          where: {
            id: cart.id,
          },
        }
      );
    } else {
      if (req.userId !== sale.userId) return;
      res.status(403).json({ msg: "Akses terlarang" });
      await Sales.update(
        { name, qty, price, sum },
        {
          where: {
            [Op.and]: [{ id: cart.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Sales updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteSales = async (req, res) => {
  try {
    const sales = await Sales.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!sales) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name, qty, price, sum } = req.body;
    if (req.role === "admin") {
      await Sales.destroy({
        where: {
          id: sales.id,
        },
      });
    } else {
      if (req.userId !== sales.userId) return;
      res.status(403).json({ msg: "Akses terlarang" });

      await Cart.destroy({
        where: {
          [Op.and]: [{ id: cart.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "sales deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
