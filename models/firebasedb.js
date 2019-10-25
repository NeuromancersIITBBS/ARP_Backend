// const firebase = require('../utils/config.js').firebase;
// const admin = require('firebase-admin');

const admin = require('../utils/config.js').admin;


//const firestore = require('../utils/config.js').firestore;

//const firestore = firebase.firestore();
const firestore = admin.firestore();


//const {Firestore} = require('@google-cloud/firestore');

// Create a new client
// const firestore = new Firestore({
//   // servicePath: 'localhost',
//   // port: 3000,
//   // sslCreds: grpc.credentials.createInsecure()
// });

console.log("Firestore is working");
const storage = require('@google-cloud/storage');
const studyResources = firestore.collection('branches');
const schema = {
   emailId: String,
   subjectName: String,
   type: String,
   semester: String,
   flags: Number,
   subjectCode: String,
   year: Number,
   review: Boolean,
   resourceId: String,
   downloadLink: String,
   flagReason: Array
};

module.exports = {
   studyResources,
   firestore,
    schema,
   storage
};
