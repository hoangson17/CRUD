const HttpException = require('../exceptions/http.exception');
const userModel = require('../models/user');
const path = require("path");
const fs = require("fs");
module.exports = {
    findAll: async(req,res)=>{
        const user = await userModel.findAll();
        return res.json({succes:true , data:user})
    },
    find: async(req,res)=>{
        const id = req.params.userId;
        const user =await userModel.find(id);
        if(!user){
            throw new HttpException("user not found",404);
        }
        return res.json({title:'find',id, data:user})
    },
    create: async(req,res)=>{
        const name = req.body.name;
        const email = req.body.email;
        const img = `/uploads/${req.file.filename}`;
        console.log(name,email,img);
        const newUser = await userModel.create({name,email,img});
        return res.json({title:"create",name:name,email:email,img:img});
    }
};