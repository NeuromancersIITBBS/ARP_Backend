const requestLogger = (request,response,next)=>{
    console.log("request method: "+ request.method);
    console.log("request path: "+ request.path);
    console.log("request body: "+ request.body);
    console.log("--------------------------------------------------");
    next();
};
const unknownEndpoint = (req,res)=>{
  return res.status(404).send({error: 'unknown end point'});
};
const errorHandler = (err,req,res,next)=>{

    console.log(err);
    next();
};
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};
