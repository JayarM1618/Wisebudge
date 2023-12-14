import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyAAwB4t99qRoHNObd8DgI1Jb6rF3sQ31AI",
  authDomain: "wisebudg-cf3e3.firebaseapp.com",
  databaseURL: "https://wisebudg-cf3e3-default-rtdb.firebaseio.com",
  projectId: "wisebudg-cf3e3",
  storageBucket: "wisebudg-cf3e3.appspot.com",
  messagingSenderId: "410133580370",
  appId: "1:410133580370:web:21036529b6c09127fb2d8b"
};

  document.addEventListener('DOMContentLoaded', function() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const firebase = app;
  const auth = firebase.auth()
  const database = firebase.database()

// Set up our register function
function register () {
  console.log("Register button clicked");
  // Get all our input fields
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const full_name = document.getElementById("full_name").value
  
 if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is invalid')
    return
    // Don't continue running the code
  }
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function(userCredential) {
    // Declare user variable
    const user = userCredential.user;
      //auth.currentUser
    
    // Create User data
    const user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }

    // Push to Firebase Database
    //database_ref.child('users/' + user.uid).set(user_data)
    database.ref("users/" + user.uid).set(user_data);

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    const errorMessage = error.message;
    //const error_code = error.code
    //const error_message = error.message
      alert(error_message)
  })
}

// Set up our login function
function login () {
  console.log("Login button clicked");
  // Get all our input fields
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // Validate input fields
  if (validate_email(email) || validate_password(password)) {
    alert('Email or Password is invalid!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function(userCredential) {
    // Declare user variable
    const user = userCredential.user;

    // Add this user to Firebase Database
    database.ref("users/" + user.uid).update({
        last_login: Date.now(),
      });

      alert("User Logged In!");
    })
    .catch(function(error) {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}
// Validate Functions
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return email !== '' && expression.test(email);
}

function validate_password(password) {
  // You can use a stronger validation library like bcryptjs here
  return password.length >= 6;
}

function validate_field(field) {
  return field !== null && field.length > 0;
}
