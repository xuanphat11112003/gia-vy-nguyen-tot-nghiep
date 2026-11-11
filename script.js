/**
 * GRADUATION INVITATION INTRO - MOBILE FIRST SAKURA EXPERIENCE
 * Pure JavaScript - Interactive Falling Petals, Sound, Modal Tabs & Image Switching
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================
     1. CANVAS SETUP FOR FLOATING SAKURA PETALS & SPARKLES
     ======================================================== */
  const canvas = document.getElementById('petalCanvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('orientationchange', () => {
    setTimeout(resizeCanvas, 150);
  });

  const isMobile = window.innerWidth < 768;
  const PETAL_COUNT = isMobile ? 32 : 55;
  const SPARKLE_COUNT = isMobile ? 22 : 40;

  const petals = [];
  const sparkles = [];
  const bursts = [];

  const petalPalettes = [
    { base: '255, 182, 193', tip: '255, 235, 240' },
    { base: '255, 160, 185', tip: '255, 220, 230' },
    { base: '248, 187, 208', tip: '255, 245, 248' },
    { base: '255, 192, 203', tip: '255, 255, 255' }
  ];

  class SakuraPetal {
    constructor(isBurst = false, originX = 0, originY = 0) {
      this.reset(isBurst, originX, originY);
    }

    reset(isBurst = false, originX = 0, originY = 0) {
      if (isBurst) {
        this.x = originX;
        this.y = originY;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 2.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1.5;
        this.isBurst = true;
        this.life = 1;
        this.decay = Math.random() * 0.015 + 0.01;
      } else {
        this.x = Math.random() * (width + 80) - 40;
        this.y = Math.random() * -height * 0.8;
        this.vx = Math.random() * 1.2 - 0.6;
        this.vy = Math.random() * 1.3 + 0.9;
        this.isBurst = false;
        this.life = 1;
      }

      this.size = Math.random() * 8 + 8;
      this.palette = petalPalettes[Math.floor(Math.random() * petalPalettes.length)];
      this.opacity = Math.random() * 0.35 + 0.65;

      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.025;
      this.flipAngle = Math.random() * Math.PI * 2;
      this.flipSpeed = Math.random() * 0.035 + 0.02;

      this.swayAngle = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.025 + 0.015;
    }

    update() {
      if (this.isBurst) {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96;
        this.vy += 0.07;
        this.life -= this.decay;
        this.angle += this.angularSpeed * 2.5;
        this.flipAngle += this.flipSpeed * 2;
        return this.life > 0;
      }

      this.swayAngle += this.swaySpeed;
      this.x += this.vx + Math.sin(this.swayAngle) * 1.1;
      this.y += this.vy;
      this.angle += this.angularSpeed;
      this.flipAngle += this.flipSpeed;

      if (this.y > height + 30 || this.x < -60 || this.x > width + 60) {
        this.reset();
      }
      return true;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      const flipScale = Math.sin(this.flipAngle);
      ctx.scale(flipScale, 1);

      const alpha = this.isBurst ? this.opacity * this.life : this.opacity;

      const grad = ctx.createLinearGradient(0, -this.size, 0, this.size);
      grad.addColorStop(0, `rgba(${this.palette.tip}, ${alpha})`);
      grad.addColorStop(1, `rgba(${this.palette.base}, ${alpha})`);
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(0, this.size);
      ctx.bezierCurveTo(this.size * 0.7, this.size * 0.4, this.size * 0.65, -this.size * 0.5, this.size * 0.25, -this.size * 0.9);
      ctx.quadraticCurveTo(0, -this.size * 0.7, -this.size * 0.25, -this.size * 0.9);
      ctx.bezierCurveTo(-this.size * 0.65, -this.size * 0.5, -this.size * 0.7, this.size * 0.4, 0, this.size);
      ctx.fill();

      ctx.restore();
    }
  }

  class FairySparkle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.8;
      this.baseAlpha = Math.random() * 0.5 + 0.25;
      this.vy = -(Math.random() * 0.4 + 0.2);
      this.vx = (Math.random() - 0.5) * 0.25;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.04 + 0.02;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += this.pulseSpeed;

      if (this.y < -10) {
        this.y = height + 10;
        this.x = Math.random() * width;
      }
    }

    draw() {
      const alpha = (Math.sin(this.pulse) * 0.4 + 0.6) * this.baseAlpha;
      ctx.save();
      ctx.fillStyle = `rgba(255, 245, 210, ${alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(255, 210, 130, 0.7)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    const p = new SakuraPetal();
    p.y = Math.random() * height;
    petals.push(p);
  }

  for (let i = 0; i < SPARKLE_COUNT; i++) {
    sparkles.push(new FairySparkle());
  }

  function renderScene() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < sparkles.length; i++) {
      sparkles[i].update();
      sparkles[i].draw();
    }

    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }

    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      if (!b.update()) {
        bursts.splice(i, 1);
      } else {
        b.draw();
      }
    }

    requestAnimationFrame(renderScene);
  }
  renderScene();

  /* ========================================================
     2. TOUCH & CLICK INTERACTION (PETAL BURST)
     ======================================================== */
  function triggerBurst(x, y) {
    const burstCount = isMobile ? 12 : 18;
    for (let i = 0; i < burstCount; i++) {
      bursts.push(new SakuraPetal(true, x, y));
    }
    playGentleChime();
  }

  window.addEventListener('click', (e) => {
    if (e.target.closest('.modal-container')) return;
    triggerBurst(e.clientX, e.clientY);
  });

  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      if (e.target.closest('.modal-container')) return;
      const touch = e.touches[0];
      triggerBurst(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  /* ========================================================
     3. INVITATION MODAL (OPEN / CLOSE / TABS)
     ======================================================== */
  const introCard = document.getElementById('mainIntroCard');
  const openBtn = document.getElementById('openInvitationBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const invitationModal = document.getElementById('invitationModal');
  const replayBtn = document.getElementById('replayBtn');
  const shareBtn = document.getElementById('shareBtn');
  const toastPopup = document.getElementById('toastPopup');

  function openCard() {
    const rect = (openBtn || introCard).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 30; i++) {
      bursts.push(new SakuraPetal(true, cx, cy));
    }

    invitationModal.classList.add('active');
    invitationModal.setAttribute('aria-hidden', 'false');
    playArpeggio();
  }

  function closeCard() {
    invitationModal.classList.remove('active');
    invitationModal.setAttribute('aria-hidden', 'true');
  }

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openCard();
    });
  }

  if (introCard) {
    introCard.addEventListener('click', (e) => {
      e.stopPropagation();
      openCard();
    });
  }

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeCard();
  });

  modalBackdrop.addEventListener('click', closeCard);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && invitationModal.classList.contains('active')) {
      closeCard();
    }
  });

  // Tab switching (Thiệp Mời vs Sơ Đồ)
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navTabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = tab.getAttribute('data-tab');

      navTabs.forEach((t) => t.classList.remove('active'));
      tabPanes.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Time Pill Selection (9:30 vs 10:00 vs 10:30)
  const timePills = document.querySelectorAll('.time-pill');
  const invitePhoto = document.getElementById('invitePhoto');

  timePills.forEach((pill) => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      timePills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const imgSource = pill.getAttribute('data-img');
      if (invitePhoto && imgSource) {
        invitePhoto.style.opacity = '0.35';
        setTimeout(() => {
          invitePhoto.src = imgSource;
          invitePhoto.style.opacity = '1';
        }, 140);
      }
    });
  });

  // Share Link Button
  if (shareBtn) {
    shareBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Đã sao chép link thiệp thành công! ✨');
        }).catch(() => {
          showToast('Đã sao chép link thiệp! ✨');
        });
      } else {
        showToast('Đã sao chép link thiệp! ✨');
      }
    });
  }

  function showToast(msg) {
    if (!toastPopup) return;
    toastPopup.textContent = msg;
    toastPopup.classList.add('show');
    setTimeout(() => {
      toastPopup.classList.remove('show');
    }, 2500);
  }

  /* ========================================================
     4. REPLAY BLOOMING ANIMATION
     ======================================================== */
  function replayAnimation() {
    closeCard();

    const stems = document.querySelectorAll('.branch-stem');
    const leaves = document.querySelectorAll('.leaf-sprout');
    const blooms = document.querySelectorAll('.bloom-container');

    [...stems, ...leaves, ...blooms].forEach((el) => {
      el.style.animation = 'none';
      el.offsetHeight; // force reflow
      el.style.animation = '';
    });

    if (introCard) {
      introCard.style.animation = 'none';
      introCard.offsetHeight;
      introCard.style.animation = '';
    }

    triggerBurst(width / 2, height / 2);
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      replayAnimation();
    });
  }

  /* ========================================================
     5. WEB AUDIO API - ETHEREAL MUSIC BOX
     ======================================================== */
  let audioCtx = null;
  let isSoundOn = false;
  let bgMelodyId = null;
  const audioToggle = document.getElementById('audioToggle');

  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtxClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, startTime, duration = 1.3, volume = 0.1) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  const harpPitches = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
  function playGentleChime() {
    if (!isSoundOn) return;
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const pitch = harpPitches[Math.floor(Math.random() * harpPitches.length)];
    playTone(pitch, now, 1.4, 0.08);
  }

  function playArpeggio() {
    if (!isSoundOn) return;
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      playTone(freq, now + idx * 0.1, 2.0, 0.12);
    });
  }

  const loopMelody = [523.25, 659.25, 783.99, 659.25, 880.00, 783.99, 659.25, 587.33];
  let melIdx = 0;

  function startBackgroundMusic() {
    bgMelodyId = setInterval(() => {
      if (!isSoundOn || !audioCtx) return;
      playTone(loopMelody[melIdx], audioCtx.currentTime, 1.8, 0.06);
      melIdx = (melIdx + 1) % loopMelody.length;
    }, 1300);
  }

  function stopBackgroundMusic() {
    if (bgMelodyId) {
      clearInterval(bgMelodyId);
      bgMelodyId = null;
    }
  }

  audioToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    getAudioContext();
    isSoundOn = !isSoundOn;

    if (isSoundOn) {
      audioToggle.classList.add('playing');
      audioToggle.title = 'Đang phát nhạc nhẹ';
      playArpeggio();
      startBackgroundMusic();
    } else {
      audioToggle.classList.remove('playing');
      audioToggle.title = 'Bật nhạc nhẹ';
      stopBackgroundMusic();
    }
  });
});
