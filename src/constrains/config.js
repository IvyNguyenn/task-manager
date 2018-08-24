import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyCFNJyzd0EKeK6WFAn7bswyyDcKUsYnMXU",
    authDomain: "taskmanager-d5686.firebaseapp.com",
    databaseURL: "https://taskmanager-d5686.firebaseio.com",
    projectId: "taskmanager-d5686",
    storageBucket: "taskmanager-d5686.appspot.com",
    messagingSenderId: "503459390083"
};
firebase.initializeApp(config);

export const firebaseApp = firebase.initializeApp(config);
