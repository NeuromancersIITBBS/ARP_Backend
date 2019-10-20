const firebase  = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');

require('dotenv').config('../config_num.env')

let PORT = process.env.PORT||3001;
console.log(PORT);
let firebaseConfig = {
    apiKey: "AIzaSyAA3gAByQRr6WNhmHpw8UtVr0Civi46Ork\n",
    authDomain: "academic-resource-portal-b.firebaseapp.com",
    databaseURL: "https://academic-resource-portal-b.firebaseio.com",
    projectId: "academic-resource-portal-b",
    storageBucket: "academic-resource-portal-b.appspot.com",
    messagingSenderId: "750397614411",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots:true});

module.exports = {
    PORT,
    firebase
};
