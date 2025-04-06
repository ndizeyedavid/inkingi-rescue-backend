import express from "express";
import sosController from "../../controllers/sos.controller.js";

const sosRouter = express.Router();

sosRouter.post("/create", sosController.createSos);
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
