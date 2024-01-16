// login.js
const loginForm = document.getElementById("login-form");
const loadingSpinner = document.getElementById("loadingSpinner");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Show the loading spinner
  loadingSpinner.classList.remove("hidden");

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Additional login logic (if needed)
    // ...

    // Hide the loading spinner
    loadingSpinner.classList.add("hidden");

    alert(`Welcome back, ${user.email}!`);
    window.location.href = "/"; // Redirect to your index page
  } catch (error) {
    // Hide the loading spinner
    loadingSpinner.classList.add("hidden");

    document.getElementById(
      "error-message"
    ).textContent = `Login failed. Error: ${error.message}`;
  }
});
