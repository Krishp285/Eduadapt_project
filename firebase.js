  //export const firebaseConfig; // Ensure this is exported if using modules

  // Replace with your Firebase project credentials
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();