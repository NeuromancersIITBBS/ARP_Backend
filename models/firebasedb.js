const firebase = require('../utils/config.js').firebase;
//const firestore = require('../utils/config.js').firestore;

const firestore = firebase.firestore();
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
    schema,
   storage
};