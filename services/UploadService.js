const xlsx = require("xlsx");
const XlsTable = require("../models/XlsTable");
const fs = require("fs");

class UploadService {
  constructor(fileDest) {
    this.fileDest = fileDest;
  }

  saveFileToDataBase() {
    const workbook = xlsx.readFile(this.fileDest);
    const table = new XlsTable({ table: workbook });
    table.save();
  }

  deleteFileFromServer() {
    fs.unlink(this.fileDest, err => {
      if (err) throw err;
    });
  }
}

module.exports = UploadService;