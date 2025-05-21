const HttpException = require('../exceptions/http.exception');
const userModel = require('../models/user');
const path = require("path");
const fs = require("fs");

module.exports = {
    // Lấy tất cả user
    findAll: async (req, res) => {
        const users = await userModel.findAll();
        return res.json({ success: true, data: users });
    },

    // Lấy 1 user theo ID
    find: async (req, res) => {
        const id = req.params.userId;
        const user = await userModel.find(id);
        if (!user) {
            throw new HttpException("User not found", 404);
        }
        return res.json({ success: true, data: user });
    },

    // Tạo user mới
    create: async (req, res) => {
        const { name, email } = req.body;
        const img = `/uploads/${req.file.filename}`;
        const newUser = await userModel.create({ name, email, img });
        return res.json({ success: true, data: newUser });
    },

    // Sửa user theo ID
    update: async (req, res) => {
        const id = req.params.userId;
        const { name, email } = req.body;
        const user = await userModel.find(id);

        if (!user) {
            throw new HttpException("User not found", 404);
        }

        // Nếu có upload ảnh mới, cập nhật ảnh
        let img = user.img;
        if (req.file) {
            // Xóa ảnh cũ nếu có
            if (img && fs.existsSync(path.join(__dirname, `../public${img}`))) {
                fs.unlinkSync(path.join(__dirname, `../public${img}`));
            }
            img = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await userModel.update(id, { name, email, img });
        return res.json({ success: true, data: updatedUser });
    },

    // Xóa user theo ID
    delete: async (req, res) => {
        const id = req.params.userId;
        const user = await userModel.find(id);
        if (!user) {
            throw new HttpException("User not found", 404);
        }

        // Xóa ảnh nếu có
        if (user.img && fs.existsSync(path.join(__dirname, `../public${user.img}`))) {
            fs.unlinkSync(path.join(__dirname, `../public${user.img}`));
        }

        await userModel.delete(id);
        return res.json({ success: true, message: `User ${id} deleted successfully.` });
    }
};
