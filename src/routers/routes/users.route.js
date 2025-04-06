import express from "express";
import usersController from "../../controllers/users.controller.js";
import { verifyToken } from "../../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/auth/signup", usersController.signup);
userRouter.post("/auth/login", usersController.login);

// normal CRUD
userRouter.get("/view/all", verifyToken, usersController.getAllUsers);
userRouter.get("/view/:id", verifyToken, usersController.getUser);
userRouter.put("/update/:id", verifyToken, usersController.updateUser);
userRouter.delete("/delete/:id", verifyToken, usersController.deleteUser);

// security
userRouter.post("/auth/change-password", verifyToken, usersController.changePassword);
// userRouter.post("/auth/forgot-password", usersController.forgotPassword); // coming soon
// userRouter.post("/auth/reset-password", usersController.resetPassword); // coming soon

export default userRouter;
