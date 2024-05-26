const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb'); 

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/mydatabase'; //MongoDB connection string

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');

    // Initialize GridFSBucket
    const gridFSBucket = new GridFSBucket(db.db, { bucketName: 'fs' });

    // Define routes
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });

    // Example route to download a file by filename
    app.get('/files/:filename', (req, res) => {
        const filename = req.params.filename;
        const downloadStream = gridFSBucket.openDownloadStreamByName(filename);

        downloadStream.on('error', (error) => {
            res.status(404).json({ message: 'File not found' });
        });

        downloadStream.pipe(res);
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
