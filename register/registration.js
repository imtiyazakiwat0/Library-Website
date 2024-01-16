// registration.js
const registrationForm = document.getElementById("registration-form");
const loadingSpinner = document.getElementById("loadingSpinner");

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  // Show the loading spinner
  loadingSpinner.classList.remove("hidden");

  const name = registrationForm.name.value;
  const username = registrationForm.username.value;
  const email = registrationForm.email.value;
  const mobile = registrationForm.mobile.value;
  const village = registrationForm.village.value;
  const age = parseInt(registrationForm.age.value);
  const password = registrationForm.password.value;

  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Save additional user information to Firestore
    await firebase.firestore().collection("users").doc(user.uid).set({
      name,
      username,
      email,
      mobile,
      village,
      age,
    });

    // Hide the loading spinner
    loadingSpinner.classList.add("hidden");

    alert(`Registration successful! Welcome, ${username}!`);
    window.location.href = "/"; // Redirect to your index page
  } catch (error) {
    // Hide the loading spinner
    loadingSpinner.classList.add("hidden");

    alert(`Registration failed. Error: ${error.message}`);
  }
});
