import express from "express";
import {
  getSales,
  getSalesById,
  createSales,
  updateSales,
  deleteSales,
} from "../controllers/Sales.js";
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();
router.get("/sales", verifyUser, getSales);
router.get("/sales/:id", verifyUser, getSalesById);
router.post("/sales", createSales);
router.patch("/sales/:id", verifyUser, updateSales);
router.delete("/sales/:id", verifyUser, deleteSales);
export default router;
