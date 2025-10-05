// Dynamic Timestamp
const timestamp = document.getElementById("timestamp");
function updateTimestamp() {
  const now = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    hour12: true,
    timeZone: "Africa/Nairobi",
  };
  timestamp.textContent =
    now.toLocaleString("en-US", options) +
    ", " +
    now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
}
setInterval(updateTimestamp, 60000); // Update every minute
updateTimestamp();

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeToggle.textContent = document.body.classList.contains("dark-theme")
    ? "Switch to Light"
    : "Toggle Theme";
  themeToggle.setAttribute(
    "aria-label",
    document.body.classList.contains("dark-theme")
      ? "Switch to Light Theme"
      : "Switch to Dark Theme"
  );
});

// Canvas Animation (Footer Particles)
const canvasContainer = document.getElementById("canvas-container");
const footerCanvas = document.createElement("canvas");
footerCanvas.width = window.innerWidth;
footerCanvas.height = 200;
canvasContainer.appendChild(footerCanvas);
const footerCtx = footerCanvas.getContext("2d");

function drawFooterParticles() {
  footerCtx.clearRect(0, 0, footerCanvas.width, footerCanvas.height);
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * footerCanvas.width;
    const y = Math.random() * footerCanvas.height;
    footerCtx.beginPath();
    footerCtx.arc(x, y, 2, 0, Math.PI * 2);
    footerCtx.fillStyle = "rgba(255, 255, 255, 0.7)";
    footerCtx.fill();
  }
  footerCtx.strokeStyle = "rgba(255, 215, 0, 0.2)";
  footerCtx.lineWidth = 0.5;
  for (let x = 0; x < footerCanvas.width; x += 50) {
    footerCtx.beginPath();
    footerCtx.moveTo(x, 0);
    footerCtx.lineTo(x, footerCanvas.height);
    footerCtx.stroke();
  }
  for (let y = 0; y < footerCanvas.height; y += 50) {
    footerCtx.beginPath();
    footerCtx.moveTo(0, y);
    footerCtx.lineTo(footerCanvas.width, y);
    footerCtx.stroke();
  }
}

function animateFooter() {
  drawFooterParticles();
  requestAnimationFrame(animateFooter);
}
animateFooter();

window.addEventListener("resize", () => {
  footerCanvas.width = window.innerWidth;
  drawFooterParticles();
});

// Avatar Animation with Blueprint Effect
const avatarCanvas = document.getElementById("avatar-canvas");
const ctx = avatarCanvas.getContext("2d");

function resizeCanvas() {
  avatarCanvas.width = window.innerWidth;
  avatarCanvas.height = window.innerHeight * 0.7;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * avatarCanvas.width;
    this.y = Math.random() * avatarCanvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.life = 1;
    this.maxLife = Math.random() * 200 + 100;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 1 / this.maxLife;
    if (this.life <= 0) {
      this.x = Math.random() * avatarCanvas.width;
      this.y = Math.random() * avatarCanvas.height;
      this.life = 1;
      this.maxLife = Math.random() * 200 + 100;
    }
    const headCenterX = avatarCanvas.width / 2;
    const headCenterY = avatarCanvas.height / 4;
    const torsoCenterY = avatarCanvas.height / 2;
    const pullStrength = 0.015;
    const dxHead = headCenterX - this.x;
    const dyHead = headCenterY - this.y;
    const distanceHead = Math.sqrt(dxHead * dxHead + dyHead * dyHead);
    if (distanceHead < 120) {
      this.speedX += (dxHead / distanceHead) * pullStrength;
      this.speedY += (dyHead / distanceHead) * pullStrength;
    }
    const dxTorso = headCenterX - this.x;
    const dyTorso = torsoCenterY - this.y;
    const distanceTorso = Math.sqrt(dxTorso * dxTorso + dyTorso * dyTorso);
    if (distanceTorso < 180) {
      this.speedX += (dxTorso / distanceTorso) * pullStrength;
      this.speedY += (dyTorso / distanceTorso) * pullStrength;
    }
  }

  draw() {
    ctx.globalAlpha = this.life * 0.8;
    ctx.fillStyle = `rgba(0, 191, 255, 0.6)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const particlesArray = [];
const particleCount = 150;

for (let i = 0; i < particleCount; i++) {
  particlesArray.push(new Particle());
}

function animateAvatar() {
  ctx.clearRect(0, 0, avatarCanvas.width, avatarCanvas.height);
  ctx.strokeStyle = "rgba(255, 215, 0, 0.1)";
  ctx.lineWidth = 0.3;
  for (let x = 0; x < avatarCanvas.width; x += 100) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, avatarCanvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < avatarCanvas.height; y += 100) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(avatarCanvas.width, y);
    ctx.stroke();
  }
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animateAvatar);
}

animateAvatar();

// Typewriter Effect for About Me
document.addEventListener("DOMContentLoaded", () => {
  const typewriterContainer = document.getElementById("typewriter-container");
  if (!typewriterContainer) {
    console.error("Typewriter container not found!");
    return;
  }

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterTexts = [
    "Hi! I'm Suaibou Adamu, a chartered civil/structural engineer with a Master's (Distinction) and over 5 years shaping UK infrastructure.",
    "Specializing in railway, highway, and marine projects with ICE and IStructE affiliations.",
    "Expert in design, inspection, and project management, delivering sustainable engineering solutions.",
  ];
  const typingSpeed = 40;
  const deletingSpeed = 25;
  const pauseDuration = 2500;

  function typeWriter() {
    if (!typewriterContainer) return;
    const currentText = typewriterTexts[textIndex];
    if (isDeleting) {
      typewriterContainer.textContent = currentText.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        setTimeout(typeWriter, 500);
      } else {
        setTimeout(typeWriter, deletingSpeed);
      }
    } else {
      typewriterContainer.textContent = currentText.substring(0, charIndex++);
      if (charIndex > currentText.length) {
        isDeleting = true;
        setTimeout(typeWriter, pauseDuration);
      } else {
        setTimeout(typeWriter, typingSpeed);
      }
    }
  }

  // Ensure typewriter starts immediately
  typeWriter();
});

// Project Expand (Fixed to be independent)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project").forEach((project) => {
    const expandButton = project.querySelector(".project-expand");
    expandButton.addEventListener("click", (e) => {
      const details = e.target.closest(".project");
      details.open = !details.open;
      e.target.textContent = details.open ? "Collapse" : "Expand Details";
      // Ensure other projects remain unaffected by resetting their state
      document.querySelectorAll(".project").forEach((otherProject) => {
        if (otherProject !== details) {
          otherProject.open = false;
          const otherButton = otherProject.querySelector(".project-expand");
          if (otherButton) otherButton.textContent = "Expand Details";
        }
      });
    });
  });
});
