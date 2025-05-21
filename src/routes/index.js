const express = require('express');
const mullter = require('multer');
const path = require('path');
const {v4:uuid} = require('uuid');
const router = express.Router();
const userController = require('../controllers/user.controller');
const HttpException = require('../exceptions/http.exception');
const authMiddleware = require('../middleware/auth.middleware');
module.exports = router;

const storage = mullter.diskStorage({
    destination: './public/uploads',
    filename:(req,file,cb)=>{
        console.log(file);
        const allowTypes = ['image/png','image/jpg','image/jpeg'];
        if(allowTypes.includes(file.mimetype)){
            const ext = path.extname(file.originalname);
            const newFile = uuid()+ext;
            console.log(newFile);
            cb(null,newFile);
        }else{
            cb(new HttpException('lỗi upload file',400));
        }
    }
})
const upload = mullter({storage,limits:{fieldSize:1024*1024}});

router.get('/users',userController.findAll);
router.get('/users/:userId',userController.find);
router.use(upload.single("image"));
router.post('/users',userController.create);

