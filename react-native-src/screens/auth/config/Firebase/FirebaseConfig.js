import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.17.0/firebase-app.js"></script>
//
// <!-- TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.17.0/firebase-analytics.js"></script>
//
// <script>
//     // Your web app's Firebase configuration
//     var firebaseConfig = {
//     apiKey: "AIzaSyABDrwvs5ifFxntVlkyRcz1TJy21XFYk-0",
//     authDomain: "luanvan-1591764764944.firebaseapp.com",
//     databaseURL: "https://luanvan-1591764764944.firebaseio.com",
//     projectId: "luanvan-1591764764944",
//     storageBucket: "luanvan-1591764764944.appspot.com",
//     messagingSenderId: "136433114251",
//     appId: "1:136433114251:web:ee646f7bcaaa0f377d088e",
//     measurementId: "G-2K14JHKJT4"
// };
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);
//     firebase.analytics();
// </script>
firebase.initializeApp({
    apiKey: 'AIzaSyABDrwvs5ifFxntVlkyRcz1TJy21XFYk-0',
    authDomain: 'luanvan-1591764764944.firebaseapp.com',
    databaseURL: 'https://luanvan-1591764764944.firebaseio.com',
    projectId: 'luanvan-1591764764944',
    storageBucket: 'luanvan-1591764764944.appspot.com',
    messagingSenderId: '136433114251',
    appId: '1:136433114251:web:ee646f7bcaaa0f377d088e',
    measurementId: 'G-2K14JHKJT4',
});

const FirebaseConfig = {
    passwordReset: email => {
        return firebase.auth().sendPasswordResetEmail(email);
    },
    // auth
    // loginWithEmail: (email, password) => {
    //     return firebase.auth().signInWithEmailAndPassword(email, password);
    // },
    // signupWithEmail: (email, password) => {
    //     return firebase.auth().createUserWithEmailAndPassword(email, password);
    // },
    // signOut: () => {
    //     return firebase.auth().signOut();
    // },
    // checkUserAuth: user => {
    //     return firebase.auth().onAuthStateChanged(user);
    // },
    //
    // // firestore
    // createNewUser: userData => {
    //     return firebase.firestore().collection('users').doc(`${userData.uid}`).set(userData);
    // },
};

export default FirebaseConfig;
