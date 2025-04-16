import { Router } from "express";
import contactController from "../../controllers/contact.controller.js";

const contactRouter = Router();

contactRouter.get("/view/all/:id", contactController.viewAll);
contactRouter.post("/add/:id", contactController.add);

export default contactRouter;
