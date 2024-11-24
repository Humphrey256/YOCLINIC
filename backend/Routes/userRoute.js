import express from "express";
import {
    updateUser,
    deleteUser,
    getAllUser,
    getSingleUser,
} from "../controllers/userController.js";

//import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();
router.get("/", getAllUser); // Public route
router.get("/:userid", getSingleUser); // Protected route
router.put("/:userId", updateUser); // Protected route
router.delete("/:userId", deleteUser); // Protected route




export default router;