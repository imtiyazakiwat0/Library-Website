// admin.js
// Check if the current user has access to the admin page
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    if (user.email === "libraryadmin@gmail.com") {
      // This user has access to the admin page, proceed to display the content.
      displayUsers();
    } else {
      // Redirect or show an error message for unauthorized access.
      alert("Unauthorized access to admin page.");
      window.location.href = "/";
      // You can also redirect the user to another page using window.location.href.
    }
  } else {
    // No user is signed in, handle this as needed.
    // For example, you can redirect the user to the login page.
    window.location.href = "login";
  }
});

const userTable = document.getElementById("user-table");
const userList = document.getElementById("user-list");

// Function to fetch and display users
async function displayUsers() {
  try {
    const usersSnapshot = await firebase.firestore().collection("users").get();
    const users = usersSnapshot.docs.map((doc) => doc.data());

    // Clear the previous table content
    userList.innerHTML = "";

    // Loop through users and create table rows
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.mobile}</td>
        <td>${user.village}</td>
        <td>${user.age}</td>
      `;
      userList.appendChild(row);
    });

    // Append the table to the userTable div
    userTable.appendChild(userList);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Call the displayUsers function when the page loads
window.addEventListener("load", () => {
  displayUsers();
});
