const mongoose = require('mongoose')

const uploadSchema = mongoose.Schema({
    filename: String, // Original filename
    fileId: mongoose.Schema.Types.ObjectId, // GridFS file ID
    contentType: String, // File content type
    uploadDate: { type: Date, default: Date.now }, // Upload date
  });

module.exports = mongoose.model('Upload',uploadSchema)