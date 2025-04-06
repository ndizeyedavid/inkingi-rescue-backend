import express from "express";
import usersController from "../../controllers/users.controller.js";

const userRouter = express.Router();

userRouter.post("/auth/signup", usersController.signup);
userRouter.post("/auth/login", usersController.login);

// normal CRUD
userRouter.get("/view/all", usersController.getAllUsers);
userRouter.get("/view/:id", usersController.getUser);
userRouter.put("/update/:id", usersController.updateUser);
userRouter.delete("/delete/:id", usersController.deleteUser);

// security
userRouter.post("/auth/change-password", usersController.changePassword);
// userRouter.post("/auth/forgot-password", usersController.forgotPassword); // coming soon
// userRouter.post("/auth/reset-password", usersController.resetPassword); // coming soon

export default userRouter;
