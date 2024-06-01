import { Request, Response, NextFunction } from "express";
import { successResponse } from "../Utils/responseMessages";
import commonFunctions from "../Utils/commonFunctions";

const officeToPDF = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const file: any = req.files;

    if (!file) {
      throw new Error("Please upload file...");
    }

    const fileName = file.file.name; // Test.docx
    const fileType = fileName.split(".")[1];

    if (fileType === "pdf") {
      throw new Error(`${fileName} it's already pdf formatted...`);
    }

    const pdfBuffer: Buffer | any = await commonFunctions.convertOfficeToPdf(
      file.file.data
    );
    const base64String = pdfBuffer.toString("base64");

    res.json(
      successResponse(
        base64String,
        200,
        "File converted to PDF successfully..."
      )
    );
  } catch (error) {
    console.log(
      `There was an issue into pdfController:officeToPDF => ${error}`
    );
    next(error);
  }
};

export default {
  officeToPDF,
};
