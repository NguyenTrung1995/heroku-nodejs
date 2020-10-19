require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const userRouter = require('./routers/user');
require('./db');

const { Storage } = require('@google-cloud/storage');

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


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send("Hello World! 1");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const respSuccess = {
        meta: {
            code: 200,
        },
        data: {
            message: 'hihi'
        }
    };
    res.send(respSuccess);
});

// Upload endpoint to send file to Firebase storage bucket
app.post('/api/upload', uploader.single('image'), async (req, res, next) => {
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
                .send({ fileName: req.file.originalname, fileLocation: publicUrl });
        });

        // When there is no more data to be consumed from the stream
        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(400).send(`Error, could not upload file: ${error}`);
        return;
    }
});

app.get("/cart/list", (req, res) => {
    const list = [
        {
            id: 1,
            name: "Ahih2",
        },
        {
            id: 2,
            name: "Hehe",
        },
    ];
    res.send(list);
});

// app.post("/cart/create", (req, res) => {
//     const { name, count, total_amount } = req.body;
//     client.connect((err) => {
//         if (err) throw err;
//         const cartItem = {
//             name,
//             count,
//             total_amount,
//             created_at: new Date().toISOString(),
//         };
//         const collection = client.db("db-test").collection("cart");
//         collection.insertOne(cartItem, function (err, resp) {
//             if (err) throw err;
//             res.send("1 document inserted");
//             client.close();
//         });
//     });
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    return () => console.log("hihi");
});
