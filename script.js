/**
 * GRADUATION INVITATION INTRO - AESTHETIC STICKERS & 3D WAX SEAL ENVELOPE
 * Pure JavaScript - Interactive Envelope Flap, Petals, Audio, Modal Tabs & Image Switching
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================
     1. CANVAS SETUP FOR FLOATING SPARKLES & SOFT PETALS
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
  const SPARKLE_COUNT = isMobile ? 22 : 36;
  const PETAL_COUNT = isMobile ? 18 : 28;

  const sparkles = [];
  const petals = [];
  const bursts = [];

  const petalPalettes = [
    { base: '255, 182, 193', tip: '255, 240, 245' }, // Soft Rose
    { base: '255, 255, 255', tip: '255, 245, 248' }, // Ivory White
    { base: '255, 209, 220', tip: '255, 250, 252' }  // Blush Pink
  ];

  class FloatingPetal {
    constructor(isBurst = false, originX = 0, originY = 0) {
      this.reset(isBurst, originX, originY);
    }

    reset(isBurst = false, originX = 0, originY = 0) {
      if (isBurst) {
        this.x = originX;
        this.y = originY;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 3;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1.5;
        this.isBurst = true;
        this.life = 1;
        this.decay = Math.random() * 0.015 + 0.01;
      } else {
        this.x = Math.random() * (width + 60) - 30;
        this.y = Math.random() * -height * 0.8;
        this.vx = Math.random() * 1.0 - 0.5;
        this.vy = Math.random() * 1.1 + 0.7;
        this.isBurst = false;
        this.life = 1;
      }

      this.size = Math.random() * 6 + 6;
      this.palette = petalPalettes[Math.floor(Math.random() * petalPalettes.length)];
      this.opacity = Math.random() * 0.3 + 0.6;

      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.025;
      this.flipAngle = Math.random() * Math.PI * 2;
      this.flipSpeed = Math.random() * 0.03 + 0.02;

      this.swayAngle = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
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
      this.x += this.vx + Math.sin(this.swayAngle) * 0.8;
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
      ctx.ellipse(0, 0, this.size * 0.5, this.size, 0, 0, Math.PI * 2);
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
      this.vy = -(Math.random() * 0.35 + 0.15);
      this.vx = (Math.random() - 0.5) * 0.2;
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
      ctx.fillStyle = `rgba(255, 235, 210, ${alpha})`;
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'rgba(255, 182, 193, 0.7)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(new FloatingPetal());
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
    const burstCount = isMobile ? 16 : 24;
    for (let i = 0; i < burstCount; i++) {
      bursts.push(new FloatingPetal(true, x, y));
    }
    playGentleChime();
  }

  window.addEventListener('click', (e) => {
    if (e.target.closest('.modal-container') || e.target.closest('.envelope-interactive')) return;
    triggerBurst(e.clientX, e.clientY);
  });

  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      if (e.target.closest('.modal-container') || e.target.closest('.envelope-interactive')) return;
      const touch = e.touches[0];
      triggerBurst(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  /* ========================================================
     3. 3D BURGUNDY ENVELOPE OPENING ANIMATION
     ======================================================== */
  const envelopeInteractive = document.getElementById('envelopeInteractive');
  const invitationModal = document.getElementById('invitationModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const replayBtn = document.getElementById('replayBtn');
  const shareBtn = document.getElementById('shareBtn');
  const toastPopup = document.getElementById('toastPopup');

  let isOpeningEnvelope = false;

  function openEnvelope() {
    if (isOpeningEnvelope) return;
    isOpeningEnvelope = true;

    // Burst particles at envelope center
    const rect = envelopeInteractive.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    triggerBurst(cx, cy);

    // Trigger 3D flap opening and letter slide
    envelopeInteractive.classList.add('opening');
    playArpeggio();

    // After realistic envelope unfolding, display full invitation modal
    setTimeout(() => {
      invitationModal.classList.add('active');
      invitationModal.setAttribute('aria-hidden', 'false');
      isOpeningEnvelope = false;
    }, 550);
  }

  function closeInvitation() {
    invitationModal.classList.remove('active');
    invitationModal.setAttribute('aria-hidden', 'true');
    // Reset envelope smoothly after modal closes
    setTimeout(() => {
      envelopeInteractive.classList.remove('opening');
    }, 400);
  }

  if (envelopeInteractive) {
    envelopeInteractive.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });

    envelopeInteractive.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeInvitation();
  });

  modalBackdrop.addEventListener('click', closeInvitation);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && invitationModal.classList.contains('active')) {
      closeInvitation();
    }
  });

  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeInvitation();
      setTimeout(() => {
        const rect = envelopeInteractive.getBoundingClientRect();
        triggerBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }, 300);
    });
  }

  /* ========================================================
     4. TABS & TIME PILL SWITCHING
     ======================================================== */
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

  const timePills = document.querySelectorAll('.time-pill');
  const invitePhoto = document.getElementById('invitePhoto');
  const downloadCardBtn = document.getElementById('downloadCardBtn');

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

        if (downloadCardBtn) {
          downloadCardBtn.href = imgSource;
        }
      }
    });
  });

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
     5. GUEST PERSONALIZATION & SMART SCHEDULE
     ======================================================== */
  const GUEST_SCHEDULE = [
    // 09:30 (10 guests)
    { name: 'Thành', time: '09:30', img: '1.png' },
    { name: 'Trân', time: '09:30', img: '1.png' },
    { name: 'Phương', time: '09:30', img: '1.png' },
    { name: 'An', time: '09:30', img: '1.png' },
    { name: 'Phát', time: '09:30', img: '1.png' },
    { name: 'Tuấn Anh', time: '09:30', img: '1.png' },
    { name: 'Hương', time: '09:30', img: '1.png' },
    { name: 'Huyền', time: '09:30', img: '1.png' },
    { name: 'Tuân', time: '09:30', img: '1.png' },
    { name: 'Yến Vy', time: '09:30', img: '1.png' },
    // 10:00 (3 guests)
    { name: 'Chương', time: '10:00', img: '2.png' },
    { name: 'Nhàn', time: '10:00', img: '2.png' },
    { name: 'Gia Tuệ', time: '10:00', img: '2.png' },
    // 10:30 (13 guests)
    { name: 'Anh Đức', time: '10:30', img: '3.png' },
    { name: 'Chế Hân', time: '10:30', img: '3.png' },
    { name: 'Việt Hoàng', time: '10:30', img: '3.png' },
    { name: 'Gia Linh', time: '10:30', img: '3.png' },
    { name: 'Đại', time: '10:30', img: '3.png' },
    { name: 'Phát', time: '10:30', img: '3.png' },
    { name: 'Xune', time: '10:30', img: '3.png' },
    { name: 'Hoàng', time: '10:30', img: '3.png' },
    { name: 'Mẩn', time: '10:30', img: '3.png' },
    { name: 'Tiktok', time: '10:30', img: '3.png' },
    { name: 'Anh Phong', time: '10:30', img: '3.png' },
    { name: 'Hữu Đức', time: '10:30', img: '3.png' },
    { name: 'Minh Đức', time: '10:30', img: '3.png' }
  ];

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function applyGuestPersonalization() {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('to') || params.get('guest') || params.get('name');
    let timeParam = params.get('time');

    if (guestParam) {
      const guestName = guestParam.trim();

      // Auto-detect time from schedule if not explicitly set
      if (!timeParam) {
        const match = GUEST_SCHEDULE.find((g) => g.name.toLowerCase() === guestName.toLowerCase());
        if (match) {
          timeParam = match.time;
        }
      }

      // 1. Personalized envelope handwritten prompt
      const envelopePrompt = document.getElementById('envelopePrompt');
      if (envelopePrompt) {
        envelopePrompt.innerHTML = `Thương gửi <span class="guest-name-accent">${escapeHtml(guestName)}</span> 💌<span class="prompt-hint-small">Chạm vào phong bì mở thiệp nhaaa ✨</span>`;
      }

      // 2. Nametag on envelope
      const envelopeNametag = document.getElementById('envelopeNametag');
      if (envelopeNametag) {
        envelopeNametag.style.display = 'inline-flex';
        envelopeNametag.textContent = `To: ${guestName} ✨`;
      }

      // 3. Modal personalized greeting badge
      const modalGuestBadge = document.getElementById('modalGuestBadge');
      if (modalGuestBadge) {
        modalGuestBadge.style.display = 'block';
        modalGuestBadge.innerHTML = `Thương mời <strong>${escapeHtml(guestName)}</strong> chung vui lễ tốt nghiệp cùng Vy 🎓`;
      }
    }

    // Auto-select time slot & image
    if (timeParam) {
      const cleanTime = timeParam.replace('h', ':').trim();
      let targetImg = '1.png';
      if (cleanTime.includes('10:00')) targetImg = '2.png';
      else if (cleanTime.includes('10:30')) targetImg = '3.png';

      timePills.forEach((pill) => {
        const text = pill.textContent.trim();
        const isMatch =
          cleanTime === '09:30' || cleanTime === '9:30'
            ? text.includes('09:30')
            : text.includes(cleanTime);
        if (isMatch) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });

      if (invitePhoto) {
        invitePhoto.src = targetImg;
      }
    }

    // If guest or specific time slot is assigned, hide the 3 time buttons
    const timeSelector = document.querySelector('.time-selector');
    if (guestParam || timeParam) {
      if (timeSelector) {
        timeSelector.style.display = 'none';
      }
    }
  }

  applyGuestPersonalization();

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
