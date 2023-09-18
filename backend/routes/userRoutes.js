
import express from "express";
const router = express.Router();
import { protect } from "../middleware/auth.js";

import { registerUser, loginUser, updateUser, deleteUser, getUser, logoutUser, createTask, updateTask, deleteTask } from "../controller/userController.js";


router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/update", protect, updateUser);
router.delete("/delete", protect, deleteUser);
router.get("/user",protect, getUser);
router.post("/logout", logoutUser);
router.post('/addtask', protect, createTask);
router.post('/updatetask', protect, updateTask);
router.delete('/deletetask', protect, deleteTask);


export default router;