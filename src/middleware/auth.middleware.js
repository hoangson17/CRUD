const HttpException = require("../exceptions/http.exception");

module.exports = (req,res,next)=>{
    const apikey = req.headers["x-api-key"];
    next();
};