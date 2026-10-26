// 1. BUTTERY SMOOTH SCROLLING (App jaisa feel)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. CINEMATIC GATE ANIMATION (GSAP)
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openInvite");
  const gate = document.getElementById("gateScreen");
  const mainInvite = document.getElementById("invitation");
  const leftPanel = document.querySelector(".left-panel");
  const rightPanel = document.querySelector(".right-panel");
  const gateCenter = document.querySelector(".gate-center");

  // Initial State (Hide Hero text)
  gsap.set(".hero-content > *", { y: 30, opacity: 0 });

  openBtn.addEventListener("click", () => {
    // Timeline for opening
// ==========================================
// FAILSAFE GATE OPENER (No GSAP required)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openInvite");
  const gate = document.getElementById("gateScreen");
  const mainInvite = document.getElementById("invitation");
  const frame = document.getElementById("gateFrame") || document.querySelector(".gate-frame");
  const gateCenter = document.querySelector(".gate-center");

  if (openBtn && gate && mainInvite) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
      // 1. CSS Animation trigger karein (Envelope khulna)
      if (frame) frame.classList.add("opening");
      if (gateCenter) {
        gateCenter.style.transition = "opacity 0.5s";
        gateCenter.style.opacity = "0";
      }
      
      // 2. 1.5 second baad Gate ko hata kar main page dikhayein
      setTimeout(() => {
        gate.style.transition = "opacity 0.8s";
        gate.style.opacity = "0";
        
        setTimeout(() => {
          gate.style.display = "none";
          mainInvite.classList.remove("hidden");
          
          // 3. Hero text ko force visible karein
          const heroContent = document.querySelector('.hero-content');
          if (heroContent) {
            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateY(0)";
          }

          // 4. Baaki cheezein start karein (Scratch, Gallery)
          if (typeof initScratch === 'function') initScratch();
          if (typeof initSwiper === 'function') initSwiper();
        }, 800);
      }, 1500); 
    });
  } else {
    console.error("Error: Gate elements (openInvite, gateScreen, invitation) nahi mile. HTML check karein.");
  }
});

    // Fade out the button and text
    tl.to(gateCenter, { opacity: 0, duration: 0.5 })
    // Slide open the envelope panels
      .to(leftPanel, { x: "-100%", rotationY: -30, duration: 1.5, ease: "power3.inOut" }, "-=0.2")
      .to(rightPanel, { x: "100%", rotationY: 30, duration: 1.5, ease: "power3.inOut" }, "<")
    // Fade out gate
      .to(gate, { opacity: 0, duration: 0.8 }, "-=0.5");
  });
});

// 3. APP-LIKE SWIPER GALLERY
function initSwiper() {
  const wrapper = document.getElementById("gallerySlideshow");
  if(!wrapper) return;
  
  // Images Insert
  const images = [
    { src: "assets/photo-1.jpg", alt: "Couple Portrait" },
    { src: "assets/photo-2.jpg", alt: "Engagement" },
    { src: "assets/photo-3.jpg", alt: "Candid" },
  ];
  
  wrapper.innerHTML = images.map(img => `
    <div class="swiper-slide">
      <img src="${img.src}" alt="${img.alt}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" />
    </div>
  `).join("");

  new Swiper('.gallery-swiper', {
    effect: 'coverflow', // Premium 3D effect
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

// 4. COUNTER (Aapka purana code)
function updateCountdown() {
  const target = new Date('2026-12-31T10:30:00').getTime();
  const now = new Date().getTime();
  const diff = target - now;
  
  if (diff < 0) return;
  
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);
  
  if(document.getElementById("days")) document.getElementById("days").innerText = String(d).padStart(2, '0');
  if(document.getElementById("hours")) document.getElementById("hours").innerText = String(h).padStart(2, '0');
  if(document.getElementById("minutes")) document.getElementById("minutes").innerText = String(m).padStart(2, '0');
  if(document.getElementById("seconds")) document.getElementById("seconds").innerText = String(s).padStart(2, '0');
}
setInterval(updateCountdown, 1000);

// 5. SCRATCH CARD LOGIC (Ise thoda aur smooth kiya gaya hai)
let scratchCtx, scratchReady = false, isDrawing = false;
function initScratch() {
  const canvas = document.getElementById("scratchCanvas");
  if (!canvas) return;
  
  const rect = canvas.getBoundingClientRect();
  if(rect.width === 0) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  scratchCtx = canvas.getContext("2d");
  scratchCtx.scale(dpr, dpr);

  // Gold Gradient for scratch
  const grad = scratchCtx.createLinearGradient(0, 0, rect.width, rect.height);
  grad.addColorStop(0, '#d4af37');
  grad.addColorStop(0.5, '#aa771c');
  grad.addColorStop(1, '#d4af37');
  
  scratchCtx.fillStyle = grad;
  scratchCtx.fillRect(0, 0, rect.width, rect.height);
  scratchCtx.globalCompositeOperation = "destination-out";
  scratchReady = true;

  canvas.addEventListener("pointerdown", (e) => { isDrawing = true; scratch(e); });
  canvas.addEventListener("pointermove", (e) => { if(isDrawing) scratch(e); });
  canvas.addEventListener("pointerup", () => { isDrawing = false; });
  canvas.addEventListener("pointerleave", () => { isDrawing = false; });
}

function scratch(e) {
  if (!scratchReady) return;
  const canvas = document.getElementById("scratchCanvas");
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  scratchCtx.beginPath();
  scratchCtx.arc(x, y, 25, 0, Math.PI * 2);
  scratchCtx.fill();
}