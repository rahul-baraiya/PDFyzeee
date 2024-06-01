import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import pdfController from "../Controllers/pdfController";

router.get("/", (req, res) => {
  res.status(200).send("Welcome to the PDFify App Backend API!.");
});

router.post("/office-to-pdf", pdfController.officeToPDF);

export default router;
