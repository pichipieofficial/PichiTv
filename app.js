/**
 * PichiTV — 100vh Viewport Master Engine
 * Handcrafted Bespoke JavaScript
 *
 * 1. Live Digital Header Clock
 * 2. 3D Perspective Gyroscope Tilt & Specular Glare Tracking
 * 3. Mobile DeviceOrientation Accelerometer Support
 * 4. Interactive Channel Switcher & Reactive Ambilight Projector Engine
 * 5. TV Remote Keyboard Navigation (Arrow Left/Right, 1, 2, 3)
 * 6. Live Broadcast Sports Clock & Cinema Progress Simulation
 * 7. Interactive Download Toast Notification
 * 8. Living Cyber Butterfly Companion & Canvas Stardust Particle Engine (Click Bursts)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. REAL-TIME LIVE DIGITAL CLOCK
     ========================================================================== */
  const clockEl = document.getElementById('live-clock');

  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hh}:${mm}:${ss}`;
  }
  updateClock();
  setInterval(updateClock, 1000);


  /* ==========================================================================
     2. 3D PERSPECTIVE GYROSCOPE TILT & SPECULAR GLARE
     ========================================================================== */
  const stageRig = document.getElementById('stage-rig');
  const tvChassis = document.getElementById('tv-chassis');
  const tvGlare = document.getElementById('tv-glare');

  let targetRotX = 0, targetRotY = 0;
  let currentRotX = 0, currentRotY = 0;

  if (stageRig && tvChassis) {
    // Mouse tracking for desktop
    window.addEventListener('mousemove', (e) => {
      const rect = stageRig.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normY = (e.clientY - centerY) / (window.innerHeight / 2);

      targetRotY = Math.max(-12, Math.min(12, normX * 10));
      targetRotX = Math.max(-10, Math.min(10, -normY * 8));

      if (tvGlare) {
        const gx = (normX + 1) * 50;
        const gy = (normY + 1) * 50;
        tvGlare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 65%)`;
      }
    });

    window.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
    });

    // Mobile gyroscope accelerometer tilt
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null) {
          targetRotY = Math.max(-12, Math.min(12, (e.gamma / 45) * 10));
          targetRotX = Math.max(-10, Math.min(10, ((e.beta - 40) / 45) * 8));
        }
      }, true);
    }

    // LERP smoothing loop
    function tiltLoop() {
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      tvChassis.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
      requestAnimationFrame(tiltLoop);
    }
    tiltLoop();
  }

  // Micro tilt on metric pills
  const tiltPills = document.querySelectorAll('[data-tilt]');
  tiltPills.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = -((y - cy) / cy) * 6;
      const ry = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(500px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });


  /* ==========================================================================
     3. INTERACTIVE CHANNEL SWITCHER & REACTIVE AMBILIGHT
     ========================================================================== */
  const chTabs = document.querySelectorAll('.ch-tab-btn');
  const streamSlides = document.querySelectorAll('.stream-slide');
  const ambilightAura = document.getElementById('ambilight-aura');
  const tvFlash = document.getElementById('tv-flash');

  const channelsList = ['sports', 'cinema', 'cyber'];
  let currentChannelIndex = 0;

  const channelConfig = {
    'sports': {
      slideId: 'slide-sports',
      ambient: 'rgba(0, 229, 255, 0.55)'
    },
    'cinema': {
      slideId: 'slide-cinema',
      ambient: 'rgba(255, 106, 26, 0.55)'
    },
    'cyber': {
      slideId: 'slide-cyber',
      ambient: 'rgba(139, 92, 246, 0.55)'
    }
  };

  function switchChannel(chKey) {
    if (!chKey || !channelConfig[chKey]) return;

    currentChannelIndex = channelsList.indexOf(chKey);

    chTabs.forEach(t => {
      if (t.getAttribute('data-ch') === chKey) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    if (tvFlash) {
      tvFlash.classList.add('flash');
      setTimeout(() => tvFlash.classList.remove('flash'), 180);
    }

    const conf = channelConfig[chKey];
    streamSlides.forEach(slide => {
      if (slide.id === conf.slideId) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    if (ambilightAura) {
      ambilightAura.style.background = conf.ambient;
    }
  }

  chTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const chKey = tab.getAttribute('data-ch');
      switchChannel(chKey);
    });
  });


  /* ==========================================================================
     4. KEYBOARD REMOTE NAVIGATION (◄ / ► or 1, 2, 3)
     ========================================================================== */
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowRight') {
      const nextIndex = (currentChannelIndex + 1) % channelsList.length;
      switchChannel(channelsList[nextIndex]);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (currentChannelIndex - 1 + channelsList.length) % channelsList.length;
      switchChannel(channelsList[prevIndex]);
    } else if (e.key === '1') {
      switchChannel('sports');
    } else if (e.key === '2') {
      switchChannel('cinema');
    } else if (e.key === '3') {
      switchChannel('cyber');
    }
  });


  /* ==========================================================================
     5. LIVE BROADCAST SIMULATION: SPORTS TIMER & CINEMA TIMECODE
     ========================================================================== */
  const sportsTimer = document.getElementById('sports-timer');
  let matchMinute = 78;
  let matchSecond = 42;

  setInterval(() => {
    matchSecond++;
    if (matchSecond >= 60) {
      matchSecond = 0;
      matchMinute++;
    }
    if (sportsTimer) {
      sportsTimer.textContent = `${String(matchMinute).padStart(2, '0')}:${String(matchSecond).padStart(2, '0')}`;
    }
  }, 1000);

  // Cinema timecode progression
  const cinemaTimecode = document.getElementById('cinema-timecode');
  const cinemaFill = document.getElementById('cinema-fill-bar');
  let cinemaSecs = 1 * 3600 + 42 * 60 + 18; // 01:42:18
  const totalSecs = 2 * 3600 + 45 * 60; // 02:45:00

  setInterval(() => {
    cinemaSecs++;
    const h = String(Math.floor(cinemaSecs / 3600)).padStart(2, '0');
    const m = String(Math.floor((cinemaSecs % 3600) / 60)).padStart(2, '0');
    const s = String(cinemaSecs % 60).padStart(2, '0');

    if (cinemaTimecode) {
      cinemaTimecode.textContent = `${h}:${m}:${s} / 02:45:00`;
    }
    if (cinemaFill) {
      const pct = (cinemaSecs / totalSecs) * 100;
      cinemaFill.style.width = `${pct.toFixed(2)}%`;
    }
  }, 1000);


  /* ==========================================================================
     6. INTERACTIVE DOWNLOAD FEEDBACK TOAST
     ========================================================================== */
  const downloadToast = document.getElementById('download-toast');
  const downloadTriggers = [
    document.getElementById('hero-download-btn'),
    document.querySelector('.header-apk-btn'),
    document.getElementById('footer-apk-link')
  ];

  let toastTimer = null;
  function triggerDownloadToast() {
    if (!downloadToast) return;
    downloadToast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      downloadToast.classList.remove('show');
    }, 4500);
  }

  downloadTriggers.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        triggerDownloadToast();
      });
    }
  });


  /* ==========================================================================
     7. AMBIENT AUDIO SCENE & FULLSCREEN CONTROLS
     ========================================================================== */
  const btnAudio = document.getElementById('btn-ambient-audio');
  const btnFullscreen = document.getElementById('btn-fs-toggle');

  let audioCtx = null;
  let isSoundActive = false;
  let synthOsc = null;
  let synthGain = null;

  if (btnAudio) {
    btnAudio.addEventListener('click', () => {
      isSoundActive = !isSoundActive;
      btnAudio.classList.toggle('active', isSoundActive);

      if (isSoundActive) {
        try {
          if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          }
          if (audioCtx.state === 'suspended') {
            audioCtx.resume();
          }

          synthOsc = audioCtx.createOscillator();
          synthGain = audioCtx.createGain();

          synthOsc.type = 'sine';
          synthOsc.frequency.setValueAtTime(110, audioCtx.currentTime);

          synthGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
          synthGain.gain.exponentialRampToValueAtTime(0.03, audioCtx.currentTime + 1);

          synthOsc.connect(synthGain);
          synthGain.connect(audioCtx.destination);
          synthOsc.start();
        } catch (e) {
          console.log('Audio init notice:', e);
        }
      } else {
        if (synthGain && synthOsc && audioCtx) {
          synthGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
          setTimeout(() => {
            if (synthOsc) {
              synthOsc.stop();
              synthOsc.disconnect();
              synthOsc = null;
            }
          }, 300);
        }
      }
    });
  }

  if (btnFullscreen && stageRig) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        stageRig.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }


  /* ==========================================================================
     8. LIVING CYBER BUTTERFLY COMPANION & STARDUST CANVAS ENGINE
     ========================================================================== */
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Stardust
  const particles = [];
  const PARTICLE_COUNT = Math.min(45, Math.floor(window.innerWidth / 35));

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.55 + 0.15,
      color: Math.random() > 0.55 ? '#FF6A1A' : (Math.random() > 0.4 ? '#00E5FF' : '#FFFFFF')
    });
  }

  // Living Companion
  const butterfly = {
    x: width * 0.65,
    y: height * 0.4,
    targetX: width * 0.65,
    targetY: height * 0.4,
    vx: 0,
    vy: 0,
    angle: 0,
    wingAngle: 0,
    wingSpeed: 0.18,
    size: 22,
    sparkles: [],
    changeTimer: 0
  };

  const mouse = { x: -1000, y: -1000, active: false };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  // Click burst interaction: Send stardust & make butterfly dart toward click!
  window.addEventListener('click', (e) => {
    // Spawn 14 glowing stardust sparkles at click location
    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 2 / 14) * i + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 3 + 1.5;
      butterfly.sparkles.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 3 + 1.5,
        life: 1.0,
        decay: 0.02 + Math.random() * 0.015,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.5 ? '#FF8533' : '#00E5FF'
      });
    }

    // Direct butterfly toward click with quick flutter
    butterfly.targetX = e.clientX;
    butterfly.targetY = e.clientY;
    butterfly.wingSpeed = 0.36;
  });

  function pickNewTarget() {
    const pad = 90;
    butterfly.targetX = pad + Math.random() * (width - pad * 2);
    butterfly.targetY = pad + Math.random() * (height - pad * 2);
    butterfly.changeTimer = 180 + Math.random() * 180;
  }
  pickNewTarget();

  function updateButterfly() {
    butterfly.changeTimer--;

    const dist = Math.hypot(mouse.x - butterfly.x, mouse.y - butterfly.y);
    if (dist < 160 && mouse.active) {
      const angle = Math.atan2(butterfly.y - mouse.y, butterfly.x - mouse.x);
      butterfly.targetX = butterfly.x + Math.cos(angle) * 190;
      butterfly.targetY = butterfly.y + Math.sin(angle) * 190;
      butterfly.wingSpeed = 0.34;
    } else {
      butterfly.wingSpeed = 0.18;
      if (butterfly.changeTimer <= 0) {
        pickNewTarget();
      }
    }

    butterfly.targetX = Math.max(50, Math.min(width - 50, butterfly.targetX));
    butterfly.targetY = Math.max(50, Math.min(height - 50, butterfly.targetY));

    butterfly.vx += (butterfly.targetX - butterfly.x) * 0.0016;
    butterfly.vy += (butterfly.targetY - butterfly.y) * 0.0016;

    butterfly.vx *= 0.94;
    butterfly.vy *= 0.94;

    butterfly.x += butterfly.vx;
    butterfly.y += butterfly.vy;

    const speed = Math.hypot(butterfly.vx, butterfly.vy);
    if (speed > 0.2) {
      butterfly.angle = Math.atan2(butterfly.vy, butterfly.vx) + Math.PI / 2;
    }

    butterfly.wingAngle += butterfly.wingSpeed;

    // Routine sparkles
    if (Math.random() < 0.35) {
      butterfly.sparkles.push({
        x: butterfly.x + (Math.random() - 0.5) * 8,
        y: butterfly.y + (Math.random() - 0.5) * 8,
        size: Math.random() * 2.2 + 1,
        life: 1.0,
        decay: 0.025 + Math.random() * 0.02,
        vx: 0,
        vy: 0.35,
        color: Math.random() > 0.4 ? '#FF8533' : '#00E5FF'
      });
    }

    for (let i = butterfly.sparkles.length - 1; i >= 0; i--) {
      const s = butterfly.sparkles[i];
      s.life -= s.decay;
      s.x += (s.vx || 0);
      s.y += (s.vy !== undefined ? s.vy : 0.35);
      if (s.life <= 0) {
        butterfly.sparkles.splice(i, 1);
      }
    }
  }

  function drawButterfly() {
    for (const s of butterfly.sparkles) {
      ctx.save();
      ctx.globalAlpha = s.life * 0.85;
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.save();
    ctx.translate(butterfly.x, butterfly.y);
    ctx.rotate(butterfly.angle);

    const flap = Math.cos(butterfly.wingAngle);
    const wingW = butterfly.size * 0.9 * Math.abs(flap);
    const wingH = butterfly.size * 1.35;

    ctx.shadowColor = '#FF6A1A';
    ctx.shadowBlur = 16;

    // Left Wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-wingW * 1.6, -wingH * 0.7, -wingW * 1.3, wingH * 0.4, 0, wingH * 0.3);
    const leftGrad = ctx.createLinearGradient(-wingW, 0, 0, 0);
    leftGrad.addColorStop(0, 'rgba(255, 106, 26, 0.95)');
    leftGrad.addColorStop(0.6, 'rgba(255, 160, 80, 0.8)');
    leftGrad.addColorStop(1, 'rgba(0, 229, 255, 0.85)');
    ctx.fillStyle = leftGrad;
    ctx.fill();

    // Right Wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(wingW * 1.6, -wingH * 0.7, wingW * 1.3, wingH * 0.4, 0, wingH * 0.3);
    const rightGrad = ctx.createLinearGradient(wingW, 0, 0, 0);
    rightGrad.addColorStop(0, 'rgba(255, 106, 26, 0.95)');
    rightGrad.addColorStop(0.6, 'rgba(255, 160, 80, 0.8)');
    rightGrad.addColorStop(1, 'rgba(0, 229, 255, 0.85)');
    ctx.fillStyle = rightGrad;
    ctx.fill();

    // Body
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(0, 0, 2.3, butterfly.size * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();

    // Antennae
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(-1, -butterfly.size * 0.4);
    ctx.lineTo(-5, -butterfly.size * 0.75);
    ctx.moveTo(1, -butterfly.size * 0.4);
    ctx.lineTo(5, -butterfly.size * 0.75);
    ctx.stroke();

    ctx.restore();
  }

  function renderFX() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    updateButterfly();
    drawButterfly();

    requestAnimationFrame(renderFX);
  }
  renderFX();

});
