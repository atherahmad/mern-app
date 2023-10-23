import express from "express";
import {
  createIdentifier,
  getIdentifier,
} from "../controllers/identifierController.js";
const router = express.Router();

//Get idintifier
router.get("/get-identifier", getIdentifier);

//Create identifier
router.post("/create-identifier", createIdentifier);

export default router;
