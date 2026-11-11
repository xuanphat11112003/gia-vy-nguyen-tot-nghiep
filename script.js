/**
 * GRADUATION INVITATION INTRO - PURE JS
 * - Interactive Canvas Falling Cherry Blossom Petals
 * - Golden Fairy Dust / Sparkles
 * - Touch & Click Petal Burst Effect
 * - Modal Open/Close & Branch Animation Replay
 * - Web Audio API Ambient Chimes
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================
     1. CANVAS SETUP FOR PETALS & SPARKLES
     ======================================================== */
  const canvas = document.getElementById('petalCanvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Petal & Sparkle Configuration
  const PETAL_COUNT = window.innerWidth < 600 ? 35 : 65;
  const SPARKLE_COUNT = 30;
  const petals = [];
  const sparkles = [];
  const burstParticles = [];

  // Petal Color Palettes (Soft pastel pinks & rose)
  const petalColors = [
    'rgba(255, 182, 193, ', // Light Pink
    'rgba(255, 192, 203, ', // Pink
    'rgba(255, 160, 185, ', // Rose Pink
    'rgba(255, 218, 224, ', // Blush Pink
    'rgba(248, 187, 208, '  // Cherry Blossom Pink
  ];

  class Petal {
    constructor(isBurst = false, originX = 0, originY = 0) {
      this.reset(isBurst, originX, originY);
    }

    reset(isBurst = false, originX = 0, originY = 0) {
      if (isBurst) {
        this.x = originX;
        this.y = originY;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1.5;
        this.isBurst = true;
        this.life = 1;
        this.decay = Math.random() * 0.012 + 0.008;
      } else {
        this.x = Math.random() * (width + 100) - 50;
        this.y = Math.random() * -height;
        this.vx = Math.random() * 1.5 - 0.75;
        this.vy = Math.random() * 1.2 + 1;
        this.isBurst = false;
        this.life = 1;
      }

      this.size = Math.random() * 9 + 8;
      this.colorBase = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.opacity = Math.random() * 0.45 + 0.55;

      // 3D rotation angles
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.02;
      this.flipAngle = Math.random() * Math.PI * 2;
      this.flipSpeed = Math.random() * 0.03 + 0.015;

      // Wind sway
      this.swayAngle = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
      if (this.isBurst) {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96;
        this.vy += 0.06; // gravity
        this.life -= this.decay;
        this.angle += this.angularSpeed * 2;
        this.flipAngle += this.flipSpeed * 2;
        return this.life > 0;
      }

      // Normal falling motion
      this.swayAngle += this.swaySpeed;
      this.x += this.vx + Math.sin(this.swayAngle) * 1.2;
      this.y += this.vy;
      this.angle += this.angularSpeed;
      this.flipAngle += this.flipSpeed;

      // Recycle when falling past screen
      if (this.y > height + 20 || this.x < -60 || this.x > width + 60) {
        this.reset();
      }
      return true;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      // Simulating 3D flip by scaling in X axis
      const flipScale = Math.sin(this.flipAngle);
      ctx.scale(flipScale, 1);

      const currentOpacity = this.isBurst ? this.opacity * this.life : this.opacity;
      ctx.fillStyle = `${this.colorBase}${currentOpacity})`;

      // Draw graceful cherry blossom petal shape
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(this.size * 0.75, -this.size * 0.6, this.size * 0.85, this.size * 0.4, 0, this.size);
      ctx.bezierCurveTo(-this.size * 0.85, this.size * 0.4, -this.size * 0.75, -this.size * 0.6, 0, -this.size);
      ctx.fill();

      // Subtle petal vein highlight
      ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.4})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.7);
      ctx.quadraticCurveTo(this.size * 0.1, 0, 0, this.size * 0.7);
      ctx.stroke();

      ctx.restore();
    }
  }

  // Fairy Dust / Sparkles Floating upwards
  class Sparkle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.8;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.vy = -(Math.random() * 0.5 + 0.2);
      this.vx = (Math.random() - 0.5) * 0.3;
      this.pulseSpeed = Math.random() * 0.04 + 0.02;
      this.pulse = Math.random() * Math.PI;
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
      const currentAlpha = (Math.sin(this.pulse) * 0.4 + 0.6) * this.alpha;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.fillStyle = `rgba(255, 240, 200, ${currentAlpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(255, 215, 140, 0.8)';
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Initialize petals & sparkles
  for (let i = 0; i < PETAL_COUNT; i++) {
    const p = new Petal();
    p.y = Math.random() * height; // spread across screen on initial load
    petals.push(p);
  }

  for (let i = 0; i < SPARKLE_COUNT; i++) {
    sparkles.push(new Sparkle());
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw sparkles
    for (let i = 0; i < sparkles.length; i++) {
      sparkles[i].update();
      sparkles[i].draw();
    }

    // Update & draw continuous petals
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }

    // Update & draw interactive burst petals
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const p = burstParticles[i];
      if (!p.update()) {
        burstParticles.splice(i, 1);
      } else {
        p.draw();
      }
    }

    requestAnimationFrame(animate);
  }
  animate();

  /* ========================================================
     2. INTERACTIVE CLICK / TOUCH PETAL BURST
     ======================================================== */
  function createPetalBurst(x, y) {
    const count = 16;
    for (let i = 0; i < count; i++) {
      burstParticles.push(new Petal(true, x, y));
    }
    // Also play soft chime note
    playHarpChime();
  }

  window.addEventListener('click', (e) => {
    // Avoid triggering when clicking modal elements directly
    if (e.target.closest('.modal-card')) return;
    createPetalBurst(e.clientX, e.clientY);
  });

  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      if (e.target.closest('.modal-card')) return;
      createPetalBurst(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  /* ========================================================
     3. MODAL INVITATION OPEN & CLOSE
     ======================================================== */
  const openCardBtn = document.getElementById('openCardBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const invitationModal = document.getElementById('invitationModal');
  const replayIntroBtn = document.getElementById('replayIntroBtn');

  function openModal() {
    // Grand petal explosion around button
    const rect = openCardBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    for (let i = 0; i < 30; i++) {
      burstParticles.push(new Petal(true, centerX, centerY));
    }

    invitationModal.classList.add('active');
    invitationModal.setAttribute('aria-hidden', 'false');
    playCelebrationChord();
  }

  function closeModal() {
    invitationModal.classList.remove('active');
    invitationModal.setAttribute('aria-hidden', 'true');
  }

  openCardBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal();
  });

  closeModalBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });

  modalBackdrop.addEventListener('click', closeModal);

  // Escape key to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && invitationModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ========================================================
     4. REPLAY BLOOMING ANIMATION FUNCTION
     ======================================================== */
  function replayBlooming() {
    closeModal();
    const branches = document.querySelectorAll('.branch-stem');
    const leaves = document.querySelectorAll('.leaf');
    const flowers = document.querySelectorAll('.flower-node');
    const introCard = document.getElementById('introCard');

    // Temporarily remove animation
    [...branches, ...leaves, ...flowers].forEach((el) => {
      el.style.animation = 'none';
      el.offsetHeight; // trigger reflow
      el.style.animation = '';
    });

    if (introCard) {
      introCard.style.animation = 'none';
      introCard.offsetHeight;
      introCard.style.animation = '';
    }

    // Burst petals at center
    createPetalBurst(width / 2, height / 2);
  }

  if (replayIntroBtn) {
    replayIntroBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      replayBlooming();
    });
  }

  /* ========================================================
     5. WEB AUDIO API - ETHEREAL MUSIC BOX / CHIMES
     (Zero external audio files needed, works immediately!)
     ======================================================== */
  let audioCtx = null;
  let isSoundActive = false;
  let bgMelodyTimer = null;
  const audioToggle = document.getElementById('audioToggle');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Soft romantic music box note
  function playNote(freq, startTime, duration = 1.2, gainLevel = 0.12) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Single harp chime note for interactions
  const chimeFreqs = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C5, D5, E5, G5, A5, C6
  function playHarpChime() {
    if (!isSoundActive) return;
    initAudio();
    const now = audioCtx.currentTime;
    const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
    playNote(freq, now, 1.5, 0.1);
  }

  // Gentle celebration chord when card opens
  function playCelebrationChord() {
    if (!isSoundActive) return;
    initAudio();
    const now = audioCtx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    chord.forEach((freq, idx) => {
      playNote(freq, now + idx * 0.12, 2.2, 0.14);
    });
  }

  // Gentle ambient melody loop
  const melodyNotes = [
    523.25, 659.25, 783.99, 659.25,
    880.00, 783.99, 659.25, 587.33
  ];
  let noteIndex = 0;

  function startAmbientMelody() {
    bgMelodyTimer = setInterval(() => {
      if (!isSoundActive || !audioCtx) return;
      const now = audioCtx.currentTime;
      playNote(melodyNotes[noteIndex], now, 2.0, 0.08);
      noteIndex = (noteIndex + 1) % melodyNotes.length;
    }, 1200);
  }

  function stopAmbientMelody() {
    if (bgMelodyTimer) {
      clearInterval(bgMelodyTimer);
      bgMelodyTimer = null;
    }
  }

  audioToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    initAudio();
    isSoundActive = !isSoundActive;

    if (isSoundActive) {
      audioToggle.classList.add('playing');
      audioToggle.title = 'Đang phát âm thanh nhẹ (Click để tắt)';
      playCelebrationChord();
      startAmbientMelody();
    } else {
      audioToggle.classList.remove('playing');
      audioToggle.title = 'Bật âm thanh nhẹ';
      stopAmbientMelody();
    }
  });
});
