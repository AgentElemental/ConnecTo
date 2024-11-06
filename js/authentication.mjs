import { firebaseConfig } from "./firebaseConfig.mjs";
firebase.initializeApp(firebaseConfig);

const button = document.querySelector("#signin-button");
const div = document.createElement("div");
const image = document.querySelector("img");

button.addEventListener("click", () => {
  try {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  } catch (err) {
    console.error("An error occurred", err);
    throw err;
  }
});
firebase.auth().onAuthStateChanged((user) => {
  button.style.display = "none";
  console.log(user.photoURL);
  if (user) {
    // User is signed in, get their information
    const uid = user.uid;
    const email = user.email;
    const displayName = user.displayName;
    const photoURL = user.photoURL;
    document.querySelector("#profile-pic").src = photoURL;
    // div.appendChild(image);
    console.log(
      `User logged in: ${uid}, ${email}, ${displayName}, ${photoURL}`
    );
    // ... other user properties
  } else {
    // User is signed out
  }
});
