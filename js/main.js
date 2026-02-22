// ============================
// MUGISHA KEVIN – main.js
// Portfolio JavaScript Logic
// ============================


// ---- 1. Dynamic Footer Year ----
const footerYear = document.getElementById('footerYear');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}


// ---- 2. Dark / Light Mode Toggle ----
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check if user had a preference saved
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', function () {
  body.classList.toggle('light');
  if (body.classList.contains('light')) {
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  } else {
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }
});


// ---- 3. Mobile Nav Toggle ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});


// ---- 4. GPA Calculator ----

// Rwandan/typical GPA scale
function markToGradePoints(mark) {
  if (mark >= 80) return 4.0;
  if (mark >= 70) return 3.5;
  if (mark >= 60) return 3.0;
  if (mark >= 50) return 2.5;
  if (mark >= 45) return 2.0;
  if (mark >= 40) return 1.5;
  return 0.0;
}

function getClassification(gpa) {
  if (gpa >= 3.7) return '🏆 First Class Honours';
  if (gpa >= 3.0) return '🥈 Upper Second Class';
  if (gpa >= 2.5) return '🥉 Lower Second Class';
  if (gpa >= 2.0) return '📘 Pass';
  return '❌ Fail';
}

const addCourseBtn = document.getElementById('addCourse');
const courseInputs = document.getElementById('courseInputs');
const calculateBtn = document.getElementById('calculateGPA');
const resetBtn = document.getElementById('resetCalc');
const calcResult = document.getElementById('calcResult');
const gpaValue = document.getElementById('gpaValue');
const gpaClass = document.getElementById('gpaClass');
const calcError = document.getElementById('calcError');

addCourseBtn.addEventListener('click', function () {
  const totalRows = courseInputs.querySelectorAll('.course-row').length;
  if (totalRows >= 10) {
    calcError.textContent = 'Maximum 10 courses allowed.';
    return;
  }
  calcError.textContent = '';

  const row = document.createElement('div');
  row.classList.add('course-row');
  row.innerHTML = `
    <input type="text" class="course-name" placeholder="Course name" />
    <input type="number" class="course-mark" placeholder="Mark (0-100)" min="0" max="100" />
  `;
  courseInputs.appendChild(row);
});

calculateBtn.addEventListener('click', function () {
  calcError.textContent = '';
  calcResult.style.display = 'none';

  const markInputs = courseInputs.querySelectorAll('.course-mark');
  let totalPoints = 0;
  let validCount = 0;
  let hasError = false;

  markInputs.forEach(function (input, index) {
    const raw = input.value.trim();

    // Validate: must not be empty
    if (raw === '') {
      calcError.textContent = 'Please fill in all mark fields, or remove empty ones.';
      hasError = true;
      input.style.borderColor = '#ff5252';
      return;
    }

    const mark = parseFloat(raw);

    // Validate: must be a number between 0 and 100
    if (isNaN(mark) || mark < 0 || mark > 100) {
      calcError.textContent = 'Marks must be numbers between 0 and 100.';
      hasError = true;
      input.style.borderColor = '#ff5252';
      return;
    }

    input.style.borderColor = '';
    totalPoints += markToGradePoints(mark);
    validCount++;
  });

  if (hasError) return;

  if (validCount === 0) {
    calcError.textContent = 'Please enter at least one course.';
    return;
  }

  const gpa = (totalPoints / validCount).toFixed(2);
  const classification = getClassification(parseFloat(gpa));

  gpaValue.textContent = gpa;
  gpaClass.textContent = classification;
  calcResult.style.display = 'flex';
});

resetBtn.addEventListener('click', function () {
  // Clear all rows and reset to 3 defaults
  courseInputs.innerHTML = `
    <div class="course-row">
      <input type="text" class="course-name" placeholder="Course name (e.g. Web Design)" />
      <input type="number" class="course-mark" placeholder="Mark (0-100)" min="0" max="100" />
    </div>
    <div class="course-row">
      <input type="text" class="course-name" placeholder="Course name (e.g. Algorithms)" />
      <input type="number" class="course-mark" placeholder="Mark (0-100)" min="0" max="100" />
    </div>
    <div class="course-row">
      <input type="text" class="course-name" placeholder="Course name (e.g. Databases)" />
      <input type="number" class="course-mark" placeholder="Mark (0-100)" min="0" max="100" />
    </div>
  `;
  calcResult.style.display = 'none';
  calcError.textContent = '';
});


// ---- 5. Contact Form Validation ----
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault(); // no backend needed

  const name = document.getElementById('senderName');
  const email = document.getElementById('senderEmail');
  const message = document.getElementById('senderMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formSuccess = document.getElementById('formSuccess');

  // Reset errors
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  formSuccess.style.display = 'none';

  let isValid = true;

  // Name validation
  if (name.value.trim().length < 2) {
    nameError.textContent = 'Name must be at least 2 characters.';
    isValid = false;
  }

  // Email validation (simple pattern)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  // Message validation
  if (message.value.trim().length < 10) {
    messageError.textContent = 'Message should be at least 10 characters.';
    isValid = false;
  }

  if (isValid) {
    // Simulate form submission success
    contactForm.reset();
    formSuccess.style.display = 'block';

    // Auto-hide success after 5 seconds
    setTimeout(function () {
      formSuccess.style.display = 'none';
    }, 5000);
  }
});
