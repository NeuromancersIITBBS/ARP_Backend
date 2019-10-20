const firebase  = require('firebase/app');
const firestore = require('firebase/firestore');
//require('firebase/auth');

require('dotenv').config();

let PORT = process.env.PORT||3002;
console.log(PORT);
let firebaseConfig = {
    //apiKey: "AIzaSyAA3gAByQRr6WNhmHpw8UtVr0Civi46Ork\n",
    authDomain: "academic-resource-portal-b.firebaseapp.com",
    databaseURL: "https://academic-resource-portal-b.firebaseio.com",
    projectId: "academic-resource-portal-b",
    storageBucket: "academic-resource-portal-b.appspot.com",
    messagingSenderId: "750397614411",
};

firebase.initializeApp(firebaseConfig);

module.exports = {
    PORT,
    firebase,
    firestore
};
