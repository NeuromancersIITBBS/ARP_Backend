const firebase  = require('firebase');


require('dotenv').config('../config_num.env')

let PORT = process.env.PORT||3001;
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
firebase.firestore().settings({timestampsInSnapshots:true});

module.exports = {
    PORT,
    firebase
};
