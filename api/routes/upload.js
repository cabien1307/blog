const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    }, 
    filename: (req, file, cd) => {
        cd(null, req.body.name)
    }
})

const upload = multer({ storage: storage });

router.post('/', upload.single("file"), (req, res) => {
    res.status(200).json('File has been uploaded')
})


module.exports = router