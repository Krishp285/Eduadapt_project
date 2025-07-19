document.addEventListener('DOMContentLoaded', () => {
  // Initialize Firebase
  let auth;
  try {
    // Only initialize if not already initialized
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    auth = firebase.auth();
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    alert('Failed to initialize Firebase. Check console for details.');
    return;
  }

  // DOM Elements
  const authSection = document.getElementById('auth');
  const detailsSection = document.getElementById('details-form');
  const logoutBtn = document.getElementById('logout-btn');
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const detailsForm = document.getElementById('details-form-element');
  const detailsMessage = document.getElementById('details-message');

  // Auth State Management
  auth.onAuthStateChanged((user) => {
    if (user) {
      authSection.style.display = 'none';
      detailsSection.style.display = 'block';
      logoutBtn.style.display = 'inline';
    } else {
      authSection.style.display = 'block';
      detailsSection.style.display = 'none';
      logoutBtn.style.display = 'none';
    }
  });

  // Login Handler
  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }
    auth.signInWithEmailAndPassword(email, password)
      .then(() => console.log('Login successful'))
      .catch((error) => alert('Login failed: ' + error.message));
  });
// Inside login.js or signup.js
document.addEventListener('DOMContentLoaded', () => {
  const signupBtn = document.getElementById('signup-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const course = document.getElementById('course').value;
      const role = document.getElementById('role').value;
      auth.createUserWithEmailAndPassword(email, password)
        .then((cred) => db.collection('users').doc(cred.user.uid).set({
          role,
          points: 0,
          badges: [],
          courses: [],
          name,
          age,
          course
        }))
        .then(() => {
          console.log('Signup successful');
          window.location.href = 'index.html'; // Redirect to index.html after signup
        })
        .catch((error) => alert(`Signup failed: ${error.message}`));
    });
  }
});
  // Signup Handler
  signupBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => console.log('Signup successful'))
      .catch((error) => alert('Signup failed: ' + error.message));
  });

  // Logout Handler
  logoutBtn.addEventListener('click', () => {
    auth.signOut()
      .then(() => console.log('Logout successful'))
      .catch((error) => console.error('Logout failed:', error));
  });

  // Details Form Submission
  detailsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const course = document.getElementById('course').value;

    if (!name || !age || !course) {
      detailsMessage.textContent = 'Please fill all fields.';
      detailsMessage.style.color = 'red';
      return;
    }

    // Redirect to index.html after successful submission
    detailsMessage.textContent = `Details submitted! Redirecting to Dashboard...`;
    detailsMessage.style.color = 'green';
    setTimeout(() => {
      window.location.href = 'index.html'; // Redirect to dashboard
    }, 1000); // Delay for 1 second to show the message
  });
});