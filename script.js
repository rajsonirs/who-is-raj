/* ==========================================================================
   Raj Soni - Personal Portfolio JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initThemeToggle();
  initNavigation();
  initSkillsFilter();
  initCreativeCorner();
  initProjectDemos();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Dynamic Background Canvas (Constellation & Data Nodes)
   -------------------------------------------------------------------------- */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Generate background particles (data nodes)
  const particleCount = Math.min(Math.floor(width / 22), 65);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(99, 102, 241, '
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting edges
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.5)';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. Theme Toggle (Dark / Light)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(themeBtn, currentTheme);

  themeBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(themeBtn, theme);
    showToast(`Switched to ${theme} theme`);
  });
}

function updateThemeIcon(btn, theme) {
  btn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

/* --------------------------------------------------------------------------
   3. Navigation & Smooth Scroll
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  // Navbar scroll background shift
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link spy
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      const isOpen = navLinksContainer.classList.contains('open');
      mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   4. Skills Interactive Filtering
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Creative Corner (Hindi One-Liners & Minimal English Bios)
   -------------------------------------------------------------------------- */
const creativeData = {
  hindi: [
    { text: "डेटा के इस शोर-शराबे में, तुम मेरी सबसे खूबसूरत इनसाइट हो।", sub: "Creative Romantic Hindi One-Liner" },
    { text: "जैसे टाइम-सीरीज़ में ट्रेंड्स बदलते हैं, वैसे ही मेरा दिन तुम्हारे एक मैसेज से संवरता है।", sub: "Data Science & Romance" },
    { text: "तुमसे मिलना किसी परफेक्ट Machine Learning मॉडल के 1.0 accuracy जैसा सुकून देता है।", sub: "AI & Heart" },
    { text: "जिंदगी के तमाम अनसुलझे वेरिएबल्स के बीच, तुम्हारा प्यार ही मेरा इकलौता कांस्टेंट है।", sub: "Romantic Hindi Quote" },
    { text: "कोड में कई सिंटैक्स एरर आ जाएं, पर तुम्हारी मुस्कुराहट हर प्रॉब्लम डिबग कर देती है।", sub: "Tech & Emotions" }
  ],
  english: [
    { text: "Architecting real-time data pipelines by day, exploring time-series stories by night.", sub: "Minimal English Bio" },
    { text: "CS Student | Turning raw datasets into dynamic dashboards & real-world predictive tools.", sub: "Data Science Student Bio" },
    { text: "Passionate about FastAPI, Streamlit, and bridging IoT telemetry with clean code.", sub: "Full-Stack Data Enthusiast" },
    { text: "Decoding complex patterns, building real-time systems, and crafting minimalist bios.", sub: "Personal Philosophy" }
  ]
};

let currentCategory = 'hindi';
let currentQuoteIndex = 0;

function initCreativeCorner() {
  const quoteText = document.getElementById('quote-text');
  const quoteSubtext = document.getElementById('quote-subtext');
  const nextBtn = document.getElementById('next-quote-btn');
  const copyBtn = document.getElementById('copy-quote-btn');
  const tabBtns = document.querySelectorAll('.creative-tabs .tab-btn');

  if (!quoteText) return;

  function renderQuote() {
    const item = creativeData[currentCategory][currentQuoteIndex];
    quoteText.style.opacity = 0;
    setTimeout(() => {
      quoteText.textContent = `"${item.text}"`;
      quoteSubtext.textContent = item.sub;
      quoteText.style.opacity = 1;
    }, 150);
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-tab');
      currentQuoteIndex = 0;
      renderQuote();
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentQuoteIndex = (currentQuoteIndex + 1) % creativeData[currentCategory].length;
      renderQuote();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = creativeData[currentCategory][currentQuoteIndex].text;
      navigator.clipboard.writeText(text);
      showToast('Copied to clipboard!');
    });
  }

  renderQuote();
}

/* --------------------------------------------------------------------------
   6. Interactive Project Demos & Modals (Chart.js)
   -------------------------------------------------------------------------- */
let unemploymentChartInstance = null;
let iotChartInstance = null;
let iotInterval = null;

function initProjectDemos() {
  // Modal handlers
  const openButtons = document.querySelectorAll('[data-open-demo]');
  const closeButtons = document.querySelectorAll('.modal-close-btn');
  const modals = document.querySelectorAll('.modal-overlay');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const demoId = btn.getAttribute('data-open-demo');
      const targetModal = document.getElementById(`modal-${demoId}`);
      if (targetModal) {
        targetModal.classList.add('active');
        if (demoId === 'unemployment') {
          renderUnemploymentDemo();
        } else if (demoId === 'manufacturing') {
          renderIoTManufacturingDemo();
        }
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(m => m.classList.remove('active'));
      if (iotInterval) clearInterval(iotInterval);
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        if (iotInterval) clearInterval(iotInterval);
      }
    });
  });
}

// Project 1 Demo: Unemployment Time-Series Seasonal Decomposition
function renderUnemploymentDemo() {
  const canvas = document.getElementById('unemployment-chart');
  if (!canvas) return;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const rawData = [6.2, 6.4, 6.1, 5.8, 5.5, 5.7, 5.9, 5.6, 5.3, 5.1, 5.2, 5.0];
  const trendData = [6.0, 5.9, 5.8, 5.7, 5.6, 5.5, 5.4, 5.3, 5.2, 5.1, 5.1, 5.0];
  const seasonalData = [0.2, 0.5, 0.3, 0.1, -0.1, 0.2, 0.5, 0.3, 0.1, 0.0, 0.1, 0.0];
  const residualData = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  if (unemploymentChartInstance) {
    unemploymentChartInstance.destroy();
  }

  unemploymentChartInstance = new Chart(canvas, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Raw Unemployment Rate (%)',
          data: rawData,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          fill: true,
          tension: 0.35,
          borderWidth: 2
        },
        {
          label: 'Long-term Trend',
          data: trendData,
          borderColor: '#3b82f6',
          borderDash: [5, 5],
          fill: false,
          tension: 0.3,
          borderWidth: 2
        },
        {
          label: 'Seasonal Component',
          data: seasonalData,
          borderColor: '#a855f7',
          fill: false,
          tension: 0.3,
          borderWidth: 1.5,
          hidden: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 } }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#94a3b8' }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#94a3b8' }
        }
      }
    }
  });

  // Setup component filter buttons
  const compBtns = document.querySelectorAll('#modal-unemployment .demo-btn');
  compBtns.forEach(btn => {
    btn.onclick = () => {
      compBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const comp = btn.getAttribute('data-component');

      if (comp === 'all') {
        unemploymentChartInstance.data.datasets[0].hidden = false;
        unemploymentChartInstance.data.datasets[1].hidden = false;
        unemploymentChartInstance.data.datasets[2].hidden = false;
      } else if (comp === 'trend') {
        unemploymentChartInstance.data.datasets[0].hidden = true;
        unemploymentChartInstance.data.datasets[1].hidden = false;
        unemploymentChartInstance.data.datasets[2].hidden = true;
      } else if (comp === 'seasonal') {
        unemploymentChartInstance.data.datasets[0].hidden = true;
        unemploymentChartInstance.data.datasets[1].hidden = true;
        unemploymentChartInstance.data.datasets[2].hidden = false;
      }
      unemploymentChartInstance.update();
    };
  });
}

// Project 2 Demo: AI-Driven Smart Manufacturing (FastAPI + Real-Time IoT Stream)
function renderIoTManufacturingDemo() {
  const canvas = document.getElementById('iot-chart');
  const payloadBox = document.getElementById('fastapi-payload');
  const tempStat = document.getElementById('stat-temp');
  const vibStat = document.getElementById('stat-vib');
  const rpmStat = document.getElementById('stat-rpm');
  const statusStat = document.getElementById('stat-status');

  if (!canvas) return;

  const initialLabels = ['0s', '1.5s', '3s', '4.5s', '6s', '7.5s'];
  const tempData = [42.1, 42.5, 43.0, 42.8, 43.2, 43.5];
  const vibData = [12.0, 12.3, 11.9, 12.5, 12.2, 12.6];

  if (iotChartInstance) {
    iotChartInstance.destroy();
  }

  iotChartInstance = new Chart(canvas, {
    type: 'line',
    data: {
      labels: initialLabels,
      datasets: [
        {
          label: 'Bearing Temp (°C)',
          data: tempData,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.3,
          borderWidth: 2
        },
        {
          label: 'Vibration (Hz)',
          data: vibData,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          fill: true,
          tension: 0.3,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 } }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
      }
    }
  });

  if (iotInterval) clearInterval(iotInterval);

  let tick = 8;
  iotInterval = setInterval(() => {
    const newTemp = +(42.5 + Math.random() * 2.5).toFixed(1);
    const newVib = +(12.0 + Math.random() * 1.5).toFixed(1);
    const newRpm = Math.floor(1450 + Math.random() * 50);
    const timeLabel = `${(tick * 1.5).toFixed(1)}s`;

    // Shift data
    iotChartInstance.data.labels.push(timeLabel);
    iotChartInstance.data.datasets[0].data.push(newTemp);
    iotChartInstance.data.datasets[1].data.push(newVib);

    if (iotChartInstance.data.labels.length > 8) {
      iotChartInstance.data.labels.shift();
      iotChartInstance.data.datasets[0].data.shift();
      iotChartInstance.data.datasets[1].data.shift();
    }

    iotChartInstance.update('none');

    // Update Live UI Cards
    if (tempStat) tempStat.textContent = `${newTemp} °C`;
    if (vibStat) vibStat.textContent = `${newVib} Hz`;
    if (rpmStat) rpmStat.textContent = `${newRpm} RPM`;

    const isAnomaly = newTemp > 44.5 || newVib > 13.2;
    if (statusStat) {
      statusStat.textContent = isAnomaly ? 'WARNING' : 'NORMAL';
      statusStat.style.color = isAnomaly ? '#ef4444' : '#22c55e';
    }

    // Live Simulated FastAPI Response Stream
    if (payloadBox) {
      const responseObj = {
        endpoint: "/api/v1/telemetry/predict",
        status: 200,
        machine_id: "CNC_LINE_04",
        timestamp: new Date().toISOString(),
        metrics: {
          temperature_celsius: newTemp,
          vibration_hz: newVib,
          spindle_rpm: newRpm
        },
        ml_prediction: {
          failure_risk: isAnomaly ? 0.78 : 0.04,
          status: isAnomaly ? "ANOMALY_DETECTED" : "HEALTHY",
          recommended_action: isAnomaly ? "Inspect Bearing Lube" : "Maintain Operation"
        }
      };
      payloadBox.textContent = JSON.stringify(responseObj, null, 2);
    }

    tick++;
  }, 1500);
}

/* --------------------------------------------------------------------------
   7. Contact Form & Clipboard Toast
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const message = document.getElementById('form-message').value;

      if (!name || !email || !message) {
        showToast('Please fill out all fields.');
        return;
      }

      showToast('Thank you! Your message has been sent to Raj Soni.');
      form.reset();
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color:#38bdf8;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Global copy helper
window.copyToClipboard = function(text, label) {
  navigator.clipboard.writeText(text);
  showToast(`Copied ${label} to clipboard!`);
};
