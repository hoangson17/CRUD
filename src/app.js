const express = require('express');
const app = express();
const routerIndex = require('./routes/index');
const router = require("./routes/index");
const authMiddleware = require('./middleware/auth.middleware');
app.use(express.json()); //middleware để phân tích body chứa JSON
app.use(express.urlencoded({ extended: true })); //middleware để phân tích body dạng URL-encode
app.use(express.static("public"));
app.use("/api",routerIndex);

const errHandling = (err,req,res,next)=>{
    const errorObj = {message:err.message};
    if(err.errors){
        errorObj.errors = err.errors;
    }
    return res.status(err.status||500).json(errorObj);
}
app.use(errHandling);


module.exports = app;


