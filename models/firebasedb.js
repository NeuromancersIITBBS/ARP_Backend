const firebase = require('../utils/config.js');
const firestore = firebase.firestore();

const studyResources = firestore.collection('branches');
const schema = {
   emailId: String,
   subjectName: String,
   type: String,
   semester: String,
   flags: Number,
   subjectCode: String,
   year: Number,
   resourceId: String,
   downloadLink: String
};

module.exports = {
   studyResources,
    schema
};