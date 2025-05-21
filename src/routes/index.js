const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');

const userController = require('../controllers/user.controller');
const HttpException = require('../exceptions/http.exception');

// multer config
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        const allowTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (allowTypes.includes(file.mimetype)) {
            const ext = path.extname(file.originalname);
            const newFile = uuid() + ext;
            cb(null, newFile);
        } else {
            cb(new HttpException('Chỉ cho phép upload ảnh', 400));
        }
    }
});

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 } }); // 1MB

router.get('/users', userController.findAll);
router.get('/users/:userId', userController.find);
router.post('/users', upload.single('image'), userController.create);
router.put('/users/:userId', upload.single('image'), userController.update);
router.delete('/users/:userId', userController.delete);

module.exports = router;
