const express = require("express");
const { v4: uuidv4 } = require('uuid');
const { Storage } = require('@google-cloud/storage');
const multer = require("multer");

const Product = require("../models/Product");
const auth = require("../middleware/auth");
const { respSucceed } = require('../utils/parseResponse');

const router = express.Router();

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
    },
});

router.post("/product/create", auth, async (req, res) => {
    // Create a new product
    try {
        const { category, type } = req.body;
        const productSchema = {
            ...req.body,
            code: `${category}_${type}`,
        };
        const product = new Product(productSchema);
        await product.save();
        res.status(201).send(req.body);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get("/products", auth, async (req, res) => {
    try {
        Product.find({}).exec((err, products) => {
            res.status(201).send(respSucceed(products));
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Upload endpoint to send file to Firebase storage bucket
router.post('/api/image/upload', uploader.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).send('Error, could not upload file');
            return;
        }

        let uuid = uuidv4();

        // Create new blob in the bucket referencing the file
        const blob = bucket.file(`images/${req.file.originalname}`);

        // Create writable stream and specifying file mimetype
        const blobWriter = blob.createWriteStream({
            uploadType: "media",
            metadata: {
                contentType: req.file.mimetype,
                metadata: {
                    firebaseStorageDownloadTokens: uuid
                }
            },
        });

        blobWriter.on('error', (err) => next(err));
        blobWriter.on('finish', () => {
            // Assembling public URL for accessing the file via HTTP
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name
                }/o/${encodeURIComponent(blob.name)}?alt=media&token=${uuid}`;

            // Return the file name and its public URL
            res
                .status(200)
                .send(respSucceed({ fileName: req.file.originalname, fileLocation: publicUrl }));
        });

        // When there is no more data to be consumed from the stream
        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(400).send(`Error, could not upload file: ${error}`);
        return;
    }
});

module.exports = router;
