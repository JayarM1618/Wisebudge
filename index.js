import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

document.addEventListener("DOMContentLoaded", function () {
  const app = initializeApp(firebaseConfig);
  const auth = app.auth();
  const database = app.database();

  // Set up our register function
  function register() {
    console.log("Register button clicked");
    // Get all input fields

    
const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const full_name = document.getElementById("full_name").value;

    if (!validate_email(email) || !validate_password(password) || !validate_field(full_name)) {
      alert("Email, password, or full name is invalid!");
      return;
    }

    // Move on with auth
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Create User data
        const user_data = {
          email,
          full_name,
          last_login: Date.now(),
        };

        // Push to Firebase Database
        database.ref(`users/${user.uid}`).set(user_data);

        // Done
        alert("User Created!!");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  // Set up our login function
  function login() {
    console.log("Login button clicked");
    // Get all input fields
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!validate_email(email) || !validate_password(password)) {
      alert("Email or password is invalid!");
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Add this user to Firebase Database
        database.ref(`users/${user.uid}`).update({
          last_login: Date.now(),
        });

        alert("User Logged In!");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  // Validate Functions
  function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return email !== "" && expression.test(email);
  }

  function validate_password(password) {
    // Consider using a stronger validation library like bcryptjs here
    return password.length >= 6;
  }

  function validate_field(field) {
    return field !== null && field.length > 0;
  }

 document.getElementById("registerBtn").addEventListener("click", register);
 document.getElementById("loginBtn").addEventListener("click", login);
});
