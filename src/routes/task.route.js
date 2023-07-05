import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  byUser,
  update,
  erase,
} from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/byUser", authMiddleware, byUser);
router.patch("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, erase);

export default router;