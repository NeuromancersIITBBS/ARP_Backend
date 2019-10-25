const firebase  = require('firebase/app');
const firestore = require('firebase/firestore');
//require('firebase/auth');

require('dotenv').config();

let PORT = process.env.PORT||3002;
console.log(PORT);

let firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
};
firebase.initializeApp(firebaseConfig);

module.exports = {
    PORT,
    firebase,
    firestore
};
