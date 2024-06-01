import libre from "libreoffice-convert";

async function convertOfficeToPdf(officeBuffer: Buffer) {
  return new Promise((resolve, reject) => {
    libre.convert(officeBuffer, ".pdf", undefined, (err, pdfBuffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(pdfBuffer);
      }
    });
  });
}

export default {
  convertOfficeToPdf,
};
