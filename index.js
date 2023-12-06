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

  // Initialize Firebase
 const app = initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  
 if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is invalid')
    return
    // Don't continue running the code
  }
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    const user = auth.currentUser

    // Add this user to Firebase Database
    const database_ref = database.ref()

    // Create User data
    const user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
      role: isAdmin ? 'admin' : 'user'
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    const error_code = error.code
    const error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is invalid!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    const user = auth.currentUser

    // Add this user to Firebase Database
    const database_ref = database.ref()

    // Create User data
    const user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    const error_code = error.code
    const error_message = error.message

    alert(error_message)
  })
}
// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  return password.length >= 6;
}

function validate_field(field) {
  return field !== null && field.length > 0;
}
