const db = require('../utils/db');
module.exports = {
    findAll:()=>{
        return db`select * from users`;
    },
    find:async(id)=>{
        const data = await db`select * from users where id = ${id}`;
        if(data.length){
            return data[0];
        }
        return null;
    },
    create:async({name,email,img})=>{
        const newUser = await db`insert into users (name,email,img) values (${name},${email},${img})
        returning *
        `;
        return newUser[0];
    },
}