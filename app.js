console.log('app.js loaded');

const idbDb = idb.openDB('EduAdaptDB', 1, {
  upgrade(db) {
    db.createObjectStore('progress', { keyPath: 'id' });
    db.createObjectStore('lessons', { keyPath: 'id' });
  },
});

const authSection = document.getElementById('auth');
const dashboardSection = document.getElementById('dashboard');
const coursesSection = document.getElementById('courses');
const aiTutorSection = document.getElementById('ai-tutor');
const quizzesSection = document.getElementById('quizzes');
const achievementsSection = document.getElementById('achievements');
const offlineModeSection = document.getElementById('offline-mode');
const arVrSection = document.getElementById('ar-vr');
const portfolioSection = document.getElementById('portfolio');
const communitySection = document.getElementById('community');
const settingsSection = document.getElementById('settings');
const helpSection = document.getElementById('help');
const logoutBtn = document.getElementById('logout-btn');
const logoutBtnSidebar = document.getElementById('logout-btn-sidebar');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const themeSwitch = document.getElementById('theme-switch');
const voiceSearchBtn = document.getElementById('voice-search');
const profileSection = document.getElementById('profile-section'); // Profile Section
const displayName = document.getElementById('display-name');
const displayAge = document.getElementById('display-age');
const displayCourse = document.getElementById('display-course');
// Log each element individually to identify nulls
console.log('authSection:', authSection);
console.log('dashboardSection:', dashboardSection);
console.log('coursesSection:', coursesSection);
console.log('aiTutorSection:', aiTutorSection);
console.log('quizzesSection:', quizzesSection);
console.log('achievementsSection:', achievementsSection);
console.log('offlineModeSection:', offlineModeSection);
console.log('arVrSection:', arVrSection);
console.log('portfolioSection:', portfolioSection);
console.log('communitySection:', communitySection);
console.log('settingsSection:', settingsSection);
console.log('helpSection:', helpSection);
console.log('logoutBtn:', logoutBtn);
console.log('logoutBtnSidebar:', logoutBtnSidebar);
console.log('sidebar:', sidebar);
console.log('menuToggle:', menuToggle);
console.log('themeSwitch:', themeSwitch);
console.log('voiceSearchBtn:', voiceSearchBtn);

document.addEventListener('DOMContentLoaded', () => {
  // Check for null elements but don't stop execution
  const elements = {
    authSection, dashboardSection, coursesSection, aiTutorSection, quizzesSection,
    achievementsSection, offlineModeSection, arVrSection, portfolioSection,
    communitySection, settingsSection, helpSection, logoutBtn, logoutBtnSidebar,
    sidebar, menuToggle, themeSwitch, voiceSearchBtn
  };
  const nullElements = Object.fromEntries(
    Object.entries(elements).filter(([key, value]) => value === null)
  );
  if (Object.keys(nullElements).length > 0) {
    console.warn('Some DOM elements are null, proceeding with available elements:', nullElements);
    // Continue execution instead of returning
  }

  auth.onAuthStateChanged((user) => {
    console.log('Auth state changed:', user ? user.email : 'null');
    const sections = {
      authSection, dashboardSection, coursesSection, aiTutorSection, quizzesSection,
      achievementsSection, offlineModeSection, arVrSection, portfolioSection,
      communitySection, settingsSection, helpSection
    };
    if (user) {
      sections.authSection.classList.remove('animate__fadeIn');
      sections.authSection.classList.add('animate__fadeOut');
      setTimeout(() => {
        sections.authSection.style.display = 'none';
        sections.dashboardSection.style.display = 'block';
        sections.coursesSection.style.display = 'none';
        sections.aiTutorSection.style.display = 'none';
        sections.quizzesSection.style.display = 'none';
        sections.achievementsSection.style.display = 'none';
        sections.offlineModeSection.style.display = 'none';
        sections.arVrSection.style.display = 'none';
        sections.portfolioSection.style.display = 'none';
        sections.communitySection.style.display = 'none';
        sections.settingsSection.style.display = 'none';
        sections.helpSection.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline';
        if (logoutBtnSidebar) logoutBtnSidebar.style.display = 'inline';
        if (auth.currentUser) loadDashboard(auth.currentUser);
      }, 500);
    } else {
      sections.authSection.style.display = 'block';
      sections.authSection.classList.add('animate__fadeIn');
      sections.dashboardSection.style.display = 'none';
      sections.coursesSection.style.display = 'none';
      sections.aiTutorSection.style.display = 'none';
      sections.quizzesSection.style.display = 'none';
      sections.achievementsSection.style.display = 'none';
      sections.offlineModeSection.style.display = 'none';
      sections.arVrSection.style.display = 'none';
      sections.portfolioSection.style.display = 'none';
      sections.communitySection.style.display = 'none';
      sections.settingsSection.style.display = 'none';
      sections.helpSection.style.display = 'none';
      if (logoutBtn) logoutBtn.style.display = 'none';
      if (logoutBtnSidebar) logoutBtnSidebar.style.display = 'none';
    }
  });


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
  const authSection = document.getElementById('auth');
  const dashboardSection = document.getElementById('dashboard');
  const coursesSection = document.getElementById('courses');
  const aiTutorSection = document.getElementById('ai-tutor');
  const achievementsSection = document.getElementById('achievements');
  const offlineModeSection = document.getElementById('offline-mode');
  const arVrSection = document.getElementById('ar-vr');
  const portfolioSection = document.getElementById('portfolio');
  const communitySection = document.getElementById('community');
  const settingsSection = document.getElementById('settings');
  const helpSection = document.getElementById('help');
  const logoutBtn = document.getElementById('logout-btn');
  const logoutBtnSidebar = document.getElementById('logout-btn-sidebar');
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menu-toggle');
  const themeSwitch = document.getElementById('theme-switch');

  // Log DOM elements to debug
  console.log('DOM elements loaded:', {
    authSection, dashboardSection, coursesSection, aiTutorSection,
    achievementsSection, offlineModeSection, arVrSection, portfolioSection,
    communitySection, settingsSection, helpSection, logoutBtn, logoutBtnSidebar,
    sidebar, menuToggle, themeSwitch
  });

  // Auth State Management
  auth.onAuthStateChanged((user) => {
    console.log('Auth state changed:', user ? user.email : 'null');
    const sections = {
      authSection, dashboardSection, coursesSection, aiTutorSection,
      achievementsSection, offlineModeSection, arVrSection, portfolioSection,
      communitySection, settingsSection, helpSection
    };
    if (user) {
      sections.authSection.classList.remove('animate__fadeIn');
      sections.authSection.classList.add('animate__fadeOut');
      setTimeout(() => {
        sections.authSection.style.display = 'none';
        sections.dashboardSection.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'inline';
        if (logoutBtnSidebar) logoutBtnSidebar.style.display = 'inline';
        if (auth.currentUser) loadDashboard(auth.currentUser);
      }, 500);
    } else {
      sections.authSection.style.display = 'block';
      sections.authSection.classList.add('animate__fadeIn');
      sections.dashboardSection.style.display = 'none';
      sections.coursesSection.style.display = 'none';
      sections.aiTutorSection.style.display = 'none';
      sections.achievementsSection.style.display = 'none';
      sections.offlineModeSection.style.display = 'none';
      sections.arVrSection.style.display = 'none';
      sections.portfolioSection.style.display = 'none';
      sections.communitySection.style.display = 'none';
      sections.settingsSection.style.display = 'none';
      sections.helpSection.style.display = 'none';
      if (logoutBtn) logoutBtn.style.display = 'none';
      if (logoutBtnSidebar) logoutBtnSidebar.style.display = 'none';
    }
  });

  // Login and Signup Handlers
  if (document.getElementById('login-btn')) {
    document.getElementById('login-btn').addEventListener('click', () => {
      console.log('Login button clicked');
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      auth.signInWithEmailAndPassword(email, password)
        .then(() => console.log('Login successful'))
        .catch((error) => alert(`Login failed: ${error.message}`));
    });
  }

  if (document.getElementById('signup-btn')) {
    document.getElementById('signup-btn').addEventListener('click', () => {
      console.log('Signup button clicked');
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const course = document.getElementById('course').value;
      auth.createUserWithEmailAndPassword(email, password)
        .then((cred) => db.collection('users').doc(cred.user.uid).set({
          role,
          points: 0,
          badges: [],
          courses: [],
          name, // Add name
          age,  // Add age
          course // Add course
        }))
        .then(() => console.log('User data saved'))
        .catch((error) => alert(`Signup failed: ${error.message}`));
    });
  }

  // Logout Functionality
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      console.log('Logout button clicked');
      auth.signOut().then(() => console.log('Logout successful'));
    });
  }
  if (logoutBtnSidebar) {
    logoutBtnSidebar.addEventListener('click', () => {
      console.log('Logout button (sidebar) clicked');
      auth.signOut().then(() => console.log('Logout successful'));
    });
  }

  // Sidebar Navigation (for pages that are separate)
  const sidebarButtons = {
    'dashboard-btn': () => toggleSection(dashboardSection),
    'courses-btn': () => toggleSection(coursesSection),
    'ai-tutor-btn': () => toggleSection(aiTutorSection),
    'quizzes-btn': () => window.location.href = 'quizzes.html', // Redirect to quizzes.html
    'achievements-btn': () => toggleSection(achievementsSection),
    'offline-mode-btn': () => toggleSection(offlineModeSection),
    'ar-vr-btn': () => toggleSection(arVrSection),
    'portfolio-btn': () => toggleSection(portfolioSection),
    'community-btn': () => toggleSection(communitySection),
    'settings-btn': () => toggleSection(settingsSection),
    'help-btn': () => toggleSection(helpSection)
  };

  function toggleSection(activeSection) {
    const sections = [
      authSection, dashboardSection, coursesSection, aiTutorSection,
      achievementsSection, offlineModeSection, arVrSection, portfolioSection,
      communitySection, settingsSection, helpSection
    ];
    sections.forEach(section => section.style.display = 'none');
    activeSection.style.display = 'block';
    if (activeSection === dashboardSection && auth.currentUser) loadDashboard(auth.currentUser);
  }
// Add this function near other functions (e.g., after loadDashboard)
function toggleSection(activeSection) {
  const sections = [
    authSection, dashboardSection, coursesSection, aiTutorSection, quizzesSection,
    achievementsSection, offlineModeSection, arVrSection, portfolioSection,
    communitySection, settingsSection, helpSection, profileSection
  ];
  sections.forEach(section => {
    if (section) section.style.display = 'none';
  });
  if (activeSection) activeSection.style.display = 'block';
  if (activeSection === dashboardSection && auth.currentUser) loadDashboard(auth.currentUser);
}

// Update profileBtn handler
if (document.getElementById('profile-btn')) {
  document.getElementById('profile-btn').addEventListener('click', () => {
    console.log('Profile button clicked');
    toggleSection(profileSection);

    const user = auth.currentUser;
    if (user) {
      db.collection('users').doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            displayName.textContent = data.name || '';
            displayAge.textContent = data.age || '';
            displayCourse.textContent = data.course || '';
          } else {
            displayName.textContent = '';
            displayAge.textContent = '';
            displayCourse.textContent = '';
            console.log('No user data found in Firestore');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          displayName.textContent = 'Error';
          displayAge.textContent = 'Error';
          displayCourse.textContent = 'Error';
        });
    } else {
      console.log('No authenticated user');
      displayName.textContent = '';
      displayAge.textContent = '';
      displayCourse.textContent = '';
    }
  });
}

// Ensure other button handlers use toggleSection
if (document.getElementById('dashboard-btn')) {
  document.getElementById('dashboard-btn').addEventListener('click', () => {
    console.log('Dashboard button clicked');
    toggleSection(dashboardSection);
  });
}

// Repeat for other buttons (courses-btn, ai-tutor-btn, etc.) by replacing their individual display logic with toggleSection
  Object.entries(sidebarButtons).forEach(([id, action]) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener('click', () => {
        console.log(`${id} clicked`);
        action();
      });
    } else {
      console.warn(`Button with id ${id} not found`);
    }
  });

  // Sidebar Toggle, Theme Switch, etc., remain unchanged...
});

// Rest of app.js (e.g., loadDashboard, requestPermission) remains as is

  if (document.getElementById('login-btn')) {
    document.getElementById('login-btn').addEventListener('click', () => {
      console.log('Login button clicked');
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      auth.signInWithEmailAndPassword(email, password)
        .then(() => console.log('Login successful'))
        .catch((error) => alert(`Login failed: ${error.message}`));
    });
  }

  if (document.getElementById('signup-btn')) {
    document.getElementById('signup-btn').addEventListener('click', () => {
      console.log('Signup button clicked');
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const course = document.getElementById('course').value;
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
        .then(() => console.log('User data saved'))
        .catch((error) => alert(`Signup failed: ${error.message}`));
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      console.log('Logout button clicked');
      auth.signOut().then(() => console.log('Logout successful'));
    });
  }

  if (logoutBtnSidebar) {
    logoutBtnSidebar.addEventListener('click', () => {
      console.log('Logout button (sidebar) clicked');
      auth.signOut().then(() => console.log('Logout successful'));
    });
  }

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.setAttribute('aria-hidden', sidebar.getAttribute('aria-hidden') === 'true' ? 'false' : 'true');
    });
  }

  if (themeSwitch) {
    themeSwitch.addEventListener('change', () => {
      console.log('Theme switch changed');
      if (themeSwitch.checked) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    });
  }

  if ('webkitSpeechRecognition' in window && voiceSearchBtn) {
    const recognition = new webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const query = event.results[0][0].transcript;
      alert(`Searching for: ${query}`);
    };
    voiceSearchBtn.addEventListener('click', () => recognition.start());
  } else if (voiceSearchBtn) {
    voiceSearchBtn.style.display = 'none';
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log('Service Worker Registered'));
  }

  function requestPermission() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          navigator.serviceWorker.ready.then((registration) => {
            registration.pushManager.subscribe({ userVisibleOnly: true });
          });
        }
      });
    }
  }
  function loadDashboard(user) {
    if (navigator.onLine) {
      db.collection('users').doc(user.uid).get()
        .then((doc) => {
          // Ensure data is an object and courses is an array
          const data = doc.exists ? doc.data() : { courses: [] };
          const courses = Array.isArray(data.courses) ? data.courses : [];
          document.getElementById('completed-courses').textContent = courses.filter(c => c.status === 'completed').length;
          document.getElementById('in-progress-courses').textContent = courses.filter(c => c.status === 'in-progress').length;
          document.getElementById('upcoming-courses').textContent = courses.filter(c => c.status === 'upcoming').length;
          document.getElementById('recommendations-text').textContent = 'Recommended: Advanced Math';
          document.getElementById('recently-viewed').textContent = 'Last viewed: Gujarat Geography';
          document.getElementById('daily-goal').textContent = '30 mins';
          document.getElementById('streak').textContent = '5 days';
          document.getElementById('announcements').textContent = 'New Quiz Tomorrow!';
        })
        .catch((error) => {
          console.error('Error loading dashboard data:', error);
          // Set default values in case of error
          document.getElementById('completed-courses').textContent = '0';
          document.getElementById('in-progress-courses').textContent = '0';
          document.getElementById('upcoming-courses').textContent = '0';
          document.getElementById('recommendations-text').textContent = '';
          document.getElementById('recently-viewed').textContent = '';
          document.getElementById('daily-goal').textContent = '';
          document.getElementById('streak').textContent = '';
          document.getElementById('announcements').textContent = '';
        });
    } else {
      console.log('Offline mode: Dashboard data not loaded');
      // Set default offline values if needed
      document.getElementById('completed-courses').textContent = '0';
      document.getElementById('in-progress-courses').textContent = '0';
      document.getElementById('upcoming-courses').textContent = '0';
    }
  }

  if (document.getElementById('dashboard-btn')) {
    document.getElementById('dashboard-btn').addEventListener('click', () => {
      console.log('Dashboard button clicked');
      dashboardSection.style.display = 'block';
      coursesSection.style.display = 'none';
      aiTutorSection.style.display = 'none';
      quizzesSection.style.display = 'none';
      achievementsSection.style.display = 'none';
      offlineModeSection.style.display = 'none';
      arVrSection.style.display = 'none';
      portfolioSection.style.display = 'none';
      communitySection.style.display = 'none';
      settingsSection.style.display = 'none';
      helpSection.style.display = 'none';
      if (auth.currentUser) loadDashboard(auth.currentUser);
    });
  }

  if (document.getElementById('courses-btn')) {
    document.getElementById('courses-btn').addEventListener('click', () => {
      console.log('Courses button clicked');
      dashboardSection.style.display = 'none';
      coursesSection.style.display = 'block';
      aiTutorSection.style.display = 'none';
      quizzesSection.style.display = 'none';
      achievementsSection.style.display = 'none';
      offlineModeSection.style.display = 'none';
      arVrSection.style.display = 'none';
      portfolioSection.style.display = 'none';
      communitySection.style.display = 'none';
      settingsSection.style.display = 'none';
      helpSection.style.display = 'none';
      document.getElementById('course-list').innerHTML = '<li>Course 1: 50%</li><li>Course 2: 75%</li>';
      document.getElementById('filter-completed').addEventListener('click', () => console.log('Filter Completed'));
      document.getElementById('filter-ongoing').addEventListener('click', () => console.log('Filter Ongoing'));
      document.getElementById('filter-recommended').addEventListener('click', () => console.log('Filter Recommended'));
      document.getElementById('resume-session').addEventListener('click', () => alert('Resuming last session...'));
      document.getElementById('download-lesson').addEventListener('click', () => alert('Downloading lesson...'));
    });
  }

  if (document.getElementById('ai-tutor-btn')) {
    document.getElementById('ai-tutor-btn').addEventListener('click', () => {
      console.log('AI Tutor button clicked');
      dashboardSection.style.display = 'none';
      coursesSection.style.display = 'none';
      aiTutorSection.style.display = 'block';
      quizzesSection.style.display = 'none';
      achievementsSection.style.display = 'none';
      offlineModeSection.style.display = 'none';
      arVrSection.style.display = 'none';
      portfolioSection.style.display = 'none';
      communitySection.style.display = 'none';
      settingsSection.style.display = 'none';
      helpSection.style.display = 'none';

      // Initialize Botpress Web Chat with EduBot
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          botId: 'your-bot-id-here', // Replace with your EduBot ID
          hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
          messagingUrl: 'https://messaging.botpress.cloud',
          clientId: 'your-client-id-here', // Replace with your client ID
          botName: 'EduBot',
          botAvatar: 'https://example.com/avatar.png', // Optional: Add an avatar URL
          theme: 'prism',
          themeColor: '#42a5f5', // Match your app’s theme
          hideWidget: false,
          showCloseButton: true,
          container: '#botpress-chat' // Target the div in AI Tutor section
        });
      }

      document.getElementById('send-chat').addEventListener('click', () => {
        console.log('Send button clicked');
        const input = document.getElementById('chat-input').value;
        if (input) {
          document.getElementById('chat-area').innerHTML += `<p>User: ${input}</p>`;
          if (window.botpressWebChat) {
            window.botpressWebChat.sendMessage(input);
          }
          document.getElementById('chat-input').value = '';
        }
      });
      document.getElementById('voice-input')?.addEventListener('click', () => alert('Voice input activated'));
      document.getElementById('ar-vr-support').addEventListener('click', () => alert('AR/VR support enabled'));
      document.getElementById('feedback-btn').addEventListener('click', () => alert('Feedback submitted'));
    });
  }
/*
  if (document.getElementById('quizzes-btn')) {
    document.getElementById('quizzes-btn').addEventListener('click', () => {
      console.log('Quizzes button clicked');
      dashboardSection.style.display = 'none';
      coursesSection.style.display = 'none';
      aiTutorSection.style.display = 'none';
      quizzesSection.style.display = 'block';
      achievementsSection.style.display = 'none';
      offlineModeSection.style.display = 'none';
      arVrSection.style.display = 'none';
      portfolioSection.style.display = 'none';
      communitySection.style.display = 'none';
      settingsSection.style.display = 'none';
      helpSection.style.display = 'none';
      document.getElementById('start-quiz').addEventListener('click', () => alert('Quiz started'));
      document.getElementById('leaderboard-quiz').addEventListener('click', () => alert('Leaderboard loaded'));
      document.getElementById('certificate-btn').addEventListener('click', () => alert('Certificate generated'));
    });
  }
*/

  if (document.getElementById('quizzes-btn')) {
    document.getElementById('quizzes-btn').addEventListener('click', () => {
      console.log('Quizzes button clicked');
      window.location.href = 'quizzes.html'; // Redirect to quizzes.html
    });
  }

  if (document.getElementById('achievements-btn')) {
    document.getElementById('achievements-btn').addEventListener('click', () => {
      console.log('Achievements button clicked');
      dashboardSection.style.display = 'none';
      coursesSection.style.display = 'none';
      aiTutorSection.style.display = 'none';
      quizzesSection.style.display = 'none';
      achievementsSection.style.display = 'block';
      offlineModeSection.style.display = 'none';
      arVrSection.style.display = 'none';
      portfolioSection.style.display = 'none';
      communitySection.style.display = 'none';
      settingsSection.style.display = 'none';
      helpSection.style.display = 'none';
      document.getElementById('points-achieve').textContent = '100';
      document.getElementById('badges-achieve').innerHTML = '<span class="badge">Quiz Master</span>';
      document.getElementById('leaderboard-achieve').innerHTML = '<p>Top 1: You - 100 pts</p>';
    });
  }

  if (document.getElementById('offline-mode-btn')) {
    document.getElementById('offline-mode-btn').addEventListener('click', () => {
      console.log('Offline Mode button clicked');
      dashboardSection.style.display = 'none';
      coursesSection.style.display = 'none';
      aiTutorSection.style.display = 'none';
      quizzesSection.style.display = 'none';
      achievementsSection.style.display = 'none';
      offlineModeSection.style.display = 'block';
      arVrSection.style.display = 'none';
      portfolioSection.style.display = 'none';
      communitySection.style.display = 'none';
      settingsSection.style.display = 'none';
      helpSection.style.display = 'none';
      document.getElementById('downloaded-content').innerHTML = '<li>Lesson 1: Downloaded</li>';
      document.getElementById('sync-progress').addEventListener('click', () => alert('Syncing...'));
      document.getElementById('manage-cache').addEventListener('click', () => alert('Managing cache...'));
      document.getElementById('storage-used').textContent = '50 MB';
    });
  }

  if (document.getElementById('ar-vr-btn')) {
    document.getElementById('ar-vr-btn').addEventListener('click', () => {
      console.log('AR/VR button clicked');
      dashboardSection.style.display = 'none';
      coursesSection.style.display = 'none';
      aiTutorSection.style.display = 'none';
      quizzesSection.style.display = 'none';
      achievementsSection.style.display = 'none';
      offlineModeSection.style.display = 'none';
      arVrSection.style.display = 'block';
      portfolioSection.style.display = 'none';
      communitySection.style.display = 'none';
      settingsSection.style.display = 'none';
      helpSection.style.display = 'none';
      document.getElementById('vr-simulations').addEventListener('click', () => alert('Simulation started'));
      document.getElementById('vr-video').addEventListener('click', () => alert('360° video playing'));
      document.getElementById('vr-headset').addEventListener('click', () => alert('VR headset mode'));
    });
  }

  if (document.getElementById('portfolio-btn')) {
    document.getElementById('portfolio-btn').addEventListener('click', () => {
      console.log('Portfolio button clicked');
      dashboardSection.style.display = 'none';
      coursesSection.style.display = 'none';
      aiTutorSection.style.display = 'none';
      quizzesSection.style.display = 'none';
      achievementsSection.style.display = 'none';
      offlineModeSection.style.display = 'none';
      arVrSection.style.display = 'none';
      portfolioSection.style.display = 'block';
      communitySection.style.display = 'none';
      settingsSection.style.display = 'none';
      helpSection.style.display = 'none';
      document.getElementById('generate-portfolio').addEventListener('click', () => alert('Portfolio generated'));
      document.getElementById('export-pdf').addEventListener('click', () => alert('Exported to PDF'));
      document.getElementById('linkedin-share').addEventListener('click', () => alert('Shared to LinkedIn'));
    });
  }

  if (document.getElementById('community-btn')) {
    document.getElementById('community-btn').addEventListener('click', () => {
      console.log('Community button clicked');
      dashboardSection.style.display = 'none';
      coursesSection.style.display = 'none';
      aiTutorSection.style.display = 'none';
      quizzesSection.style.display = 'none';
      achievementsSection.style.display = 'none';
      offlineModeSection.style.display = 'none';
      arVrSection.style.display = 'none';
      portfolioSection.style.display = 'none';
      communitySection.style.display = 'block';
      settingsSection.style.display = 'none';
      helpSection.style.display = 'none';
      document.getElementById('join-qa').addEventListener('click', () => alert('Joining Q&A...'));
      document.getElementById('create-thread').addEventListener('click', () => alert('Thread created'));
    });
  }

  if (document.getElementById('settings-btn')) {
    document.getElementById('settings-btn').addEventListener('click', () => {
      console.log('Settings button clicked');
      dashboardSection.style.display = 'none';
      coursesSection.style.display = 'none';
      aiTutorSection.style.display = 'none';
      quizzesSection.style.display = 'none';
      achievementsSection.style.display = 'none';
      offlineModeSection.style.display = 'none';
      arVrSection.style.display = 'none';
      portfolioSection.style.display = 'none';
      communitySection.style.display = 'none';
      settingsSection.style.display = 'block';
      helpSection.style.display = 'none';
      document.getElementById('save-profile').addEventListener('click', () => alert('Profile saved'));
      document.getElementById('cache-control').addEventListener('click', () => alert('Cache settings opened'));
      document.getElementById('change-password').addEventListener('click', () => alert('Change password'));
    });
  }

  if (document.getElementById('help-btn')) {
    document.getElementById('help-btn').addEventListener('click', () => {
      console.log('Help button clicked');
      dashboardSection.style.display = 'none';
      coursesSection.style.display = 'none';
      aiTutorSection.style.display = 'none';
      quizzesSection.style.display = 'none';
      achievementsSection.style.display = 'none';
      offlineModeSection.style.display = 'none';
      arVrSection.style.display = 'none';
      portfolioSection.style.display = 'none';
      communitySection.style.display = 'none';
      settingsSection.style.display = 'none';
      helpSection.style.display = 'block';
      document.getElementById('contact-support').addEventListener('click', () => alert('Contacting support...'));
      document.getElementById('tutorials').addEventListener('click', () => alert('Tutorials opened'));
      document.getElementById('report-bug').addEventListener('click', () => alert('Bug reported'));
    });
  }
});
if (document.getElementById('profile-btn')) {
  document.getElementById('profile-btn').addEventListener('click', () => {
    console.log('Profile button clicked');
    toggleSection(profileSection);

    const user = auth.currentUser;
    if (user) {
      db.collection('users').doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            displayName.textContent = data.name || '';
            displayAge.textContent = data.age || '';
            displayCourse.textContent = data.course || '';
          } else {
            displayName.textContent = '';
            displayAge.textContent = '';
            displayCourse.textContent = '';
            console.log('No user data found in Firestore');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          displayName.textContent = 'Error';
          displayAge.textContent = 'Error';
          displayCourse.textContent = 'Error';
        });
    } else {
      console.log('No authenticated user');
      displayName.textContent = '';
      displayAge.textContent = '';
      displayCourse.textContent = '';
    }
  });
}

function requestPermission() {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.pushManager.subscribe({ userVisibleOnly: true });
        });
      }
    });
  }
}

function loadDashboard(user) {
  if (navigator.onLine) {
    db.collection('users').doc(user.uid).get().then((doc) => {
      const data = doc.data() || { courses: [] };
      document.getElementById('completed-courses').textContent = data.courses.filter(c => c.status === 'completed').length;
      document.getElementById('in-progress-courses').textContent = data.courses.filter(c => c.status === 'in-progress').length;
      document.getElementById('upcoming-courses').textContent = data.courses.filter(c => c.status === 'upcoming').length;
      document.getElementById('recommendations-text').textContent = 'Recommended: Advanced Math';
      document.getElementById('recently-viewed').textContent = 'Last viewed: Gujarat Geography';
      document.getElementById('daily-goal').textContent = '30 mins';
      document.getElementById('streak').textContent = '5 days';
      document.getElementById('announcements').textContent = 'New Quiz Tomorrow!';
    });
  }
}


document.addEventListener('DOMContentLoaded', () => {
  // Initialize Firebase
  let auth, db;
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    auth = firebase.auth();
    db = firebase.firestore(); // Initialize Firestore
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    alert('Failed to initialize Firebase. Check console for details.');
    return;
  }

  // DOM Elements
  const logoutBtn = document.getElementById('logout-btn');
  const profileBtn = document.getElementById('profile-btn');
  const dashboardContent = document.getElementById('dashboard-content');
  const profileSection = document.getElementById('profile-section');
  const displayName = document.getElementById('display-name');
  const displayAge = document.getElementById('display-age');
  const displayCourse = document.getElementById('display-course');



  // Auth State Management
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = 'login.html'; // Redirect to login if not authenticated
    }
  });

  // Logout Handler
  logoutBtn.addEventListener('click', () => {
    auth.signOut()
      .then(() => {
        console.log('Logout successful');
        window.location.href = 'login.html';
      })
      .catch((error) => console.error('Logout failed:', error));
  });


document.addEventListener('DOMContentLoaded', () => {
  // ... (other initializations)

  const profileBtn = document.getElementById('profile-btn');
  const profileSection = document.getElementById('profile-section');
  const displayName = document.getElementById('display-name');
  const displayAge = document.getElementById('display-age');
  const displayCourse = document.getElementById('display-course');

  // Function to toggle sections
  function toggleSection(activeSection) {
    const sections = [
      authSection, dashboardSection, coursesSection, aiTutorSection, quizzesSection,
      achievementsSection, offlineModeSection, arVrSection, portfolioSection,
      communitySection, settingsSection, helpSection, profileSection
    ];
    sections.forEach(section => {
      if (section) section.style.display = 'none';
    });
    if (activeSection) activeSection.style.display = 'block';
    if (activeSection === dashboardSection && auth.currentUser) loadDashboard(auth.currentUser);
  }

  // Profile Button Handler
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      console.log('Profile button clicked');
      console.log('profileSection:', profileSection); // Debug
      console.log('displayName:', displayName); // Debug
      console.log('displayAge:', displayAge); // Debug
      console.log('displayCourse:', displayCourse); // Debug
      toggleSection(profileSection);
  
      const user = auth.currentUser;
      console.log('auth.currentUser:', user); // Debug
      if (user) {
        db.collection('users').doc(user.uid).get()
          .then((doc) => {
            console.log('Firestore doc exists:', doc.exists); // Debug
            if (doc.exists) {
              const data = doc.data();
              console.log('Fetched data:', data); // Debug
              displayName.textContent = data.name || '';
              displayAge.textContent = data.age || '';
              displayCourse.textContent = data.course || '';
            } else {
              displayName.textContent = '';
              displayAge.textContent = '';
              displayCourse.textContent = '';
              console.log('No user data found in Firestore');
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            displayName.textContent = 'Error';
            displayAge.textContent = 'Error';
            displayCourse.textContent = 'Error';
          });
      } else {
        console.log('No authenticated user');
        displayName.textContent = '';
        displayAge.textContent = '';
        displayCourse.textContent = '';
      }
    });
  }
});

  // ... (other event listeners)
});
