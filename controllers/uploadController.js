const path = require("path");
const UploadService = require("../services/UploadService");

class UploadController {
  static upload(req, res, next) {
    const uploadService = new UploadService(path.join(__dirname, "../", req.file.path));
    try {
      uploadService.saveFileToDataBase();
      uploadService.deleteFileFromServer();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UploadController;
