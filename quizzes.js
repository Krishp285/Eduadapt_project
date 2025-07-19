document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase with error handling
    let auth, db;
    try {
      if (typeof firebaseConfig === 'undefined') {
        throw new Error('firebaseConfig is not defined. Ensure firebase.js is loaded correctly.');
      }
      firebase.initializeApp(firebaseConfig);
      auth = firebase.auth();
      db = firebase.firestore();
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Firebase initialization failed:', error);
      auth = { onAuthStateChanged: (callback) => callback(null) };
      db = { collection: () => ({ doc: () => ({ get: () => Promise.resolve({ data: () => ({}) }) }) }) };
      console.warn('Using fallback auth and db objects due to initialization failure');
    }
  
    // DOM Elements
    const quizFeedback = document.getElementById('quiz-feedback');
    const feedbackText = document.getElementById('feedback-text');
    const certificateBtn = document.getElementById('certificate-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const logoutBtnSidebar = document.getElementById('logout-btn-sidebar');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const themeSwitch = document.getElementById('theme-switch');
    const viewFullLeaderboard = document.getElementById('view-full-leaderboard');
  
    // Log DOM elements to debug
    console.log('DOM elements loaded:', {
      quizFeedback, feedbackText, certificateBtn, logoutBtn, logoutBtnSidebar,
      sidebar, menuToggle, themeSwitch, viewFullLeaderboard
    });
  
    // Sidebar Navigation
    const sidebarButtons = {
      'dashboard-btn': 'index.html',
      'courses-btn': 'courses.html',
      'ai-tutor-btn': 'ai-tutor.html',
      'quizzes-btn': 'quizzes.html',
      'achievements-btn': 'achievements.html',
      'offline-mode-btn': 'offline-mode.html',
      'ar-vr-btn': 'ar-vr.html',
      'portfolio-btn': 'portfolio.html',
      'community-btn': 'community.html',
      'settings-btn': 'settings.html',
      'help-btn': 'help.html'
    };
  
    Object.entries(sidebarButtons).forEach(([id, url]) => {
      const button = document.getElementById(id);
      if (button) {
        button.addEventListener('click', () => {
          console.log(`${id} clicked, redirecting to ${url}`);
          window.location.href = url;
        });
      } else {
        console.warn(`Button with id ${id} not found`);
      }
    });
  
    // Auth State Management
    auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log('No user logged in, redirecting to index.html');
        window.location.href = 'index.html'; // Redirect to index.html instead of login.html
      }
    });
  
    // Logout Functionality
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
          console.log('Logged out, redirecting to index.html');
          window.location.href = 'index.html'; // Redirect to index.html
        });
      });
    }
    if (logoutBtnSidebar) {
      logoutBtnSidebar.addEventListener('click', () => {
        auth.signOut().then(() => {
          console.log('Logged out, redirecting to index.html');
          window.location.href = 'index.html'; // Redirect to index.html
        });
      });
    }
  
    // Sidebar Toggle
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        sidebar.setAttribute('aria-hidden', sidebar.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');
      });
    }
  
    // Theme Switch
    if (themeSwitch) {
      themeSwitch.addEventListener('click', () => {
        if (themeSwitch.checked) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      });
    }
  
    // Quiz Start Buttons (Demo)
    document.querySelectorAll('.start-quiz-btn').forEach(button => {
      button.addEventListener('click', () => {
        const quizId = button.getAttribute('data-quiz-id');
        console.log(`Starting quiz: ${quizId}`);
        setTimeout(() => {
          quizFeedback.style.display = 'block';
          feedbackText.textContent = `Score: 8/10 - Great job! Focus on ${quizId.split('-')[0]} concepts.`;
          certificateBtn.disabled = false;
          document.getElementById('certificate-status').textContent = 'Quiz completed! Generate your certificate below.';
        }, 2000);
      });
    });
  
    // Certificate Generation (Demo)
    if (certificateBtn) {
      certificateBtn.addEventListener('click', () => {
        alert('Certificate generated! (Demo)');
      });
    }
  
    // View Full Leaderboard (Demo)
    if (viewFullLeaderboard) {
      viewFullLeaderboard.addEventListener('click', () => {
        alert('Full Leaderboard: \n1. Raj - 95 points\n2. Priya - 90 points\n3. Alex - 85 points');
      });
    }
  });