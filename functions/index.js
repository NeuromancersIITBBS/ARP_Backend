const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const functions = require('firebase-functions');


// const server = http.createServer(app);
// server.listen(config.PORT,()=>{
//    console.log(`Server is running on port ${config.PORT}`)
// });

 exports.app = functions.https.onRequest(app);

