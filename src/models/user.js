const db = require('../utils/db');

module.exports = {
    // Lấy tất cả user
    findAll: () => {
        return db`SELECT * FROM users`;
    },

    // Tìm 1 user theo ID
    find: async (id) => {
        const data = await db`SELECT * FROM users WHERE id = ${id}`;
        return data.length ? data[0] : null;
    },

    // Tạo user mới
    create: async ({ name, email, img }) => {
        const newUser = await db`
            INSERT INTO users (name, email, img)
            VALUES (${name}, ${email}, ${img})
            RETURNING *`;
        return newUser[0];
    },

    // Cập nhật user theo ID
    update: async (id, { name, email, img }) => {
        const updatedUser = await db`
            UPDATE users
            SET name = ${name}, email = ${email}, img = ${img}
            WHERE id = ${id}
            RETURNING *`;
        return updatedUser[0];
    },

    // Xóa user theo ID
    delete: async (id) => {
        return db`DELETE FROM users WHERE id = ${id}`;
    }
};
