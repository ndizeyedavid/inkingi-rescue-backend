import express from "express";
import sosController from "../../controllers/sos.controller.js";
import upload from "../../middleware/multer.middleware.js";

const sosRouter = express.Router();

sosRouter.post("/create", upload.array("proofs"), sosController.createSos);
sosRouter.get("/view/all", sosController.getAllSos);
sosRouter.get("/view/:id", sosController.getOneSos);
sosRouter.put("/update/:id", sosController.updateSos);
sosRouter.delete("/delete/:id", sosController.deleteSos);

// actions
sosRouter.post("/comment/:id", sosController.commentSos);
sosRouter.post("/volunteer/:id", sosController.volunteerSos);

// revert actions
sosRouter.post("/unvolunteer/:id", sosController.unvolunteerSos);

export default sosRouter;
