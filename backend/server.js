const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.SERVER_PORT || 5000
//const { protect } = require('./middleware/authMiddleware')

const Upload = require('./models/uploadModel')
const Case = require('./models/caseModel')

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const connection = mongoose.connection;

// Initialize GridFS stream
let gfs;
connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads'); // Name of the GridFS collection to store uploads
});

connectDB()
const app = express()

//middleware for post request body parsing
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/cases', require('./routes/caseRoutes'))
app.use('/api/clients', require('./routes/clientRoutes'))
app.use('/api/lawyers', require('./routes/lawyerRoutes'))
app.use('/api/admins', require('./routes/adminRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
// const express = require('express')
// const router = express.Router()
// Configure multer storage for GridFS
const storage = new GridFsStorage({
  url: 'mongodb+srv://19bd1a058q:arVlmXHqLP2O9PNs@startcluster.tuy59ku.mongodb.net/myapp?retryWrites=true&w=majority', // Replace with your MongoDB connection URL
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: 'uploads', // Name of the GridFS bucket
      filename: file.originalname // Use the original filename
    };
  }
});

// Create multer middleware for file upload
const upload = multer({ storage });

// API endpoint for file upload
app.post('/api/upload/evidence', upload.single('file'), async (req, res) => {
  try {
    // Create a new upload document in the Upload collection
    const newUpload = await Upload.create({
      filename: req.file.originalname,
      fileId: req.file.id,
      contentType: req.file.contentType,
      //uploadedBy: req.user._id // Assuming you have a user authentication system
    });
    // Update the case with the new upload ID
    const caseId = req.body.caseId; // Assuming you pass the case ID in the request body
    const caseToUpdate = await Case.findById(caseId);
    caseToUpdate.evidences.push(newUpload._id); // Assuming you are updating evidence array
    await caseToUpdate.save();
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed' });
  }
});

app.post('/api/upload/report', upload.single('file'), async (req, res) => {
  try {
    // Create a new upload document in the Upload collection

    const newUpload = await Upload.create({
      filename: req.file.originalname,
      fileId: req.file.id,
      contentType: req.file.contentType,
      //uploadedBy: req.user._id // Assuming you have a user authentication system
    });

    // Update the case with the new upload ID
    const caseId = req.body.caseId; // Assuming you pass the case ID in the request body
    const caseToUpdate = await Case.findById(caseId);
    await caseToUpdate.reports.push(newUpload._id); // Assuming you are updating evidence array
    await caseToUpdate.save();
    res.status(200).json({ message: 'File uploaded successfully in case '+caseId });
  } catch (error) {
    res.status(500).json({ 
      message: 'File upload failed in caseId',
  });
  }
});


// app.get('/api/upload/:fileId', (req, res) => {
//   const { fileId } = req.params;

//   // Retrieve the file from MongoDB GridFS
//   gfs.uploads.find({ _id: fileId }, (err, file) => {
//     if (err || !file) {
//       // File not found
//       res.status(404).json({ message: 'File not found' });
//     } else {
//       // Set the appropriate headers for viewing the file in the browser
//       res.setHeader('Content-Type', file.contentType);

//       // Stream the file to the response
//       const readstream = gfs.createReadStream({ _id: fileId });
//       readstream.pipe(res);
//     }
//   });
// });

app.get('api/upload/:id',(req, res, next) => {
            gfs.find({ _id: req.params.id }).toArray((err, uploads) => {
                if (!uploads[0] || uploads.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available',
                    });
                }

                if (uploads[0].contentType === 'image/jpeg' || uploads[0].contentType === 'image/png' || uploads[0].contentType === 'image/svg+xml') {
                    // render image to browser
                    gfs.openDownloadStreamByName(req.params.id).pipe(res);
                } else {
                    res.status(404).json({
                        err: 'Not an image',
                    });
                }
            });
        });