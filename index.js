// // Initialize Firebase with your Firebase config
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID"
// };

// firebase.initializeApp(firebaseConfig);

// Get references to DOM elements
const userStatus = document.getElementById("userStatus");
const logoutButton = document.getElementById("logoutButton");
const loginAlert = document.getElementById("loginAlert");
const loginRedirectButton = document.getElementById("loginRedirectButton");
const registerRedirectButton = document.getElementById(
  "registerRedirectButton"
);

// Add event listeners for login and register redirection
loginRedirectButton.addEventListener("click", () => {
  window.location.href = "login"; // Redirect to your login page
});

registerRedirectButton.addEventListener("click", () => {
  window.location.href = "register"; // Redirect to your registration page
});

// Add a Firebase authentication state change listener
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is logged in, display the logout button
    logoutButton.style.display = "block";
    // Hide the login alert if it's shown
    loginAlert.style.display = "none";
  } else {
    // User is not logged in, display the login alert
    logoutButton.style.display = "none";
    loginAlert.style.display = "block";
  }
});

// Add a click event listener for the logout button
logoutButton.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // User has logged out successfully
      alert("User has logged out successfully.");
    })
    .catch((error) => {
      console.error("Logout error: " + error);
    });
});
