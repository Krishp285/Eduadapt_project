const firebaseConfig = {
  apiKey: "api-key-placeholder",
  authDomain: "eduadapt-8e62e.firebaseapp.com",
  projectId: "eduadapt-8e62e",
  storageBucket: "eduadapt-8e62e.firebasestorage.app",
  messagingSenderId: "1002156798282",
  appId: "1:1002156798282:web:c51e9231ae08d268c8d1b3",
  measurementId: "G-74W748KTRP"
};
  //export const firebaseConfig; // Ensure this is exported if using modules

  // Replace with your Firebase project credentials
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();