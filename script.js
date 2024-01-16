// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC4Hjsbyp61_FhOFmnS07Lz4mv07hytsd0",
    authDomain: "library-website-3228d.firebaseapp.com",
    projectId: "library-website-3228d",
    storageBucket: "library-website-3228d.appspot.com",
    messagingSenderId: "1082782551901",
    appId: "1:1082782551901:web:dd251d46c81878f78e22b4",
    measurementId: "G-805WFLNKE2"
  };
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  const registrationForm = document.getElementById('registration-form');
  
  registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      await db.collection('users').doc(user.uid).set({
        name: name,
        email: email,
        role: 'user'
      });
      
      alert('Registration successful!');
    } catch (error) {
      alert(error.message);
    }
  });