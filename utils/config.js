// const firebase  = require('firebase/app');
// const firestore = require('firebase/firestore');

var admin = require("firebase-admin");

var serviceAccount = require("../serviceacc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arpbackend-7b652.firebaseio.com"
});

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

//firebase.initializeApp(firebaseConfig);
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'https://arpbackend-7b652.firebaseio.com'
// });
module.exports = {
    PORT,
    //firebase,
    admin
    //firestore
};
