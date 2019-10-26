const admin = require("firebase-admin");

const serviceAccount = require("../serviceacc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arpbackend-7b652.firebaseio.com"
});

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

module.exports = {
    PORT,
    admin
};
