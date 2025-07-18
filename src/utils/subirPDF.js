const cloudinary = require("../config/cloudinary");

const subirPDF = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ebooksPDF",
        resource_type: "auto",
        format: "pdf",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

module.exports = subirPDF;
