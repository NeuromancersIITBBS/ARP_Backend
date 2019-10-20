const firebase = require('../utils/config.js');
const firestore = firebase.firestore();
const storage = firebase.storage();
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