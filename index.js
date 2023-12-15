import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
    const auth = getAuth(app);
    const database = getDatabase(app);  // Use getDatabase to initialize the database

    document.getElementById("registerBtn").addEventListener("click", register);
    document.getElementById("loginBtn").addEventListener("click", login);

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
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Create User data
                const user_data = {
                    email,
                    full_name,
                    last_login: Date.now(),
                };

                // Push to Firebase Database
                return set(ref(database, `users/${user.uid}`), user_data);
               })

              .then(() => {
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

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Add this user to Firebase Database
               return update(ref(database, `users/${user.uid}`), {
                    last_login: Date.now(),
                });
              
               })
              .then(() => {
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
});
