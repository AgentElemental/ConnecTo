import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.mjs";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Select button and profile picture elements
const button = document.getElementById("signin-button");
const profilePic = document.getElementById("profile-pic");

// Click event listener for sign-in
button.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error("An error occurred during sign-in:", err);
  }
});

// Auth state listener to handle UI updates
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, update profile picture
    profilePic.src = user.photoURL || "default-image.png"; // Fallback image if photoURL is unavailable
    profilePic.style.display = "inline-block"; // Show profile picture
    button.style.display = "none"; // Hide sign-in button
  } else {
    // User is signed out
    profilePic.style.display = "none";
    button.style.display = "inline-block"; // Show sign-in button
  }
});
