module.exports = class HttpException extends Error{
    constructor(message,status,errors){
        super(message);
        this.status = status;
        if(errors){
            this.errors = errors;
        }
    }
}