// Get references to DOM elements
const profileContainer = document.getElementById("profileContainer");
const profilePicture = document.getElementById("profilePicture");
const displayName = document.getElementById("displayName");
const displayEmail = document.getElementById("displayEmail");
const profileForm = document.getElementById("profileForm");
const nameInput = document.getElementById("name");
const profilePictureInput = document.getElementById("profilePictureInput");
const changeEmailButton = document.getElementById("changeEmailButton");
const backButton = document.querySelector(".font-semibold");

// Function to populate the user's profile
function populateUserProfile(user) {
    // Display the user's email
    displayEmail.textContent = user.email || "user@example.com";

    // Check if the user has a display name
    if (user.displayName) {
        displayName.textContent = user.displayName;
    } else {
        // If the user doesn't have a display name, fetch it from the database
        const db = firebase.firestore();
        const userDocRef = db.collection('users').doc(user.uid);

        userDocRef.get().then((doc) => {
            if (doc.exists) {
                const userName = doc.data().name;
                // Display the user's name from the database
                displayName.textContent = userName;
            }
        }).catch((error) => {
            console.error("Error fetching user's name from the database: " + error.message);
        });
    }

    // Display the user's profile picture if available
    if (user.photoURL) {
        profilePicture.src = user.photoURL;
    }
}

// Function to update the user's profile
function updateProfile(user) {
    const newName = nameInput.value.trim();
    const loadingSpinner = document.getElementById("loadingSpinner"); // Get the loading spinner element

    // Show the loading spinner while updating
    loadingSpinner.classList.remove("hidden");

    if (newName !== "" || profilePictureInput.files.length > 0) {
        // Create a Promise that resolves when both name and profile picture updates are complete
        const updatePromises = [];

        // Update the user's name
        if (newName !== "") {
            updatePromises.push(
                user.updateProfile({
                    displayName: newName
                })
            );
        }

        // Check if a new profile picture was selected
        if (profilePictureInput.files.length > 0) {
            const newProfilePicture = profilePictureInput.files[0];

            // Upload the new profile picture to Firebase Storage
            const storageRef = firebase.storage().ref(`profilePictures/${user.uid}/${newProfilePicture.name}`);
            const uploadTask = storageRef.put(newProfilePicture);

            // Add a promise to resolve when the profile picture update is complete
            updatePromises.push(
                new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        null,
                        (error) => {
                            console.error("Error uploading profile picture: " + error.message);
                            reject(error);
                        },
                        () => {
                            // Get the download URL of the uploaded image
                            uploadTask.snapshot.ref
                                .getDownloadURL()
                                .then((downloadURL) => {
                                    // Update the user's photoURL with the download URL
                                    user
                                        .updateProfile({
                                            photoURL: downloadURL
                                        })
                                        .then(() => {
                                            // Update successful, display the new profile picture
                                            profilePicture.src = downloadURL;
                                            resolve();
                                        })
                                        .catch((error) => {
                                            console.error("Error updating profile picture: " + error.message);
                                            reject(error);
                                        });
                                });
                        }
                    );
                })
            );
        }

        // Wait for all update promises to resolve
        Promise.all(updatePromises)
            .then(() => {
                // All updates are successful, hide the loading spinner and display success message
                loadingSpinner.classList.add("hidden");
                alert("Profile updated successfully.");
            })
            .catch((error) => {
                console.error("Error updating profile: " + error.message);
                // Hide the loading spinner in case of an error
                loadingSpinner.classList.add("hidden");
            });
    } else {
        // No updates were made, hide the loading spinner
        loadingSpinner.classList.add("hidden");
    }
}


// Function to change the user's email
function changeEmail() {
    const user = firebase.auth().currentUser;

    if (user) {
        // Redirect to the email change page
        window.location.href = "emailchange.html";
    }
}

// Function to go back to the index page
function goBackToIndex() {
    window.location.href = "/";
}

// Attach click event listeners to the buttons
changeEmailButton.addEventListener("click", changeEmail);
backButton.addEventListener("click", goBackToIndex);

// Add a Firebase authentication state change listener
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is logged in, display and populate the profile
        profileContainer.style.display = "block";
        populateUserProfile(user);
        profileForm.addEventListener("submit", (e) => {
            e.preventDefault();
            updateProfile(user);
        });
    } else {
        // User is not logged in, redirect to the login page
        window.location.href = "login";
    }
});
