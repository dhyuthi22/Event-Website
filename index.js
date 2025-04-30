// Dark Mode Toggle
let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};
themeButton.addEventListener('click', toggleDarkMode);

// RSVP Handling
const submitButton = document.getElementById('rsvp-button');
let count = 3;

const addParticipant = (person) => {
  const participantList = document.querySelector('.rsvp-participants ul');
  const newParticipant = document.createElement('li');
  newParticipant.textContent = `🌹 ${person.name} - ${person.side}`;
  participantList.appendChild(newParticipant);

  const oldCount = document.getElementById('rsvp-count');
  oldCount.remove();

  count++;
  const newCount = document.createElement('p');
  newCount.id = "rsvp-count";
  newCount.textContent = `🔔 ${count} guests are ready to celebrate with us!`;
  document.querySelector('.rsvp-participants').appendChild(newCount);
};

const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;
  const rsvpInputs = document.getElementById("rsvp-form").elements;

  let person = {
    name: rsvpInputs[0].value.trim(),
    email: rsvpInputs[1].value.trim(),
    side: rsvpInputs[2].value.trim()
  };

  for (let i = 0; i < rsvpInputs.length; i++) {
    const input = rsvpInputs[i];
    if (input && input.tagName === "INPUT") {
      const value = input.value.trim();
      input.classList.remove("error");

      if (value.length < 2) {
        containsErrors = true;
        input.classList.add("error");
      } else if (input.id === "email") {
        if (!value.includes("@") || !value.includes(".")) {
          containsErrors = true;
          input.classList.add("error");
        }
      } else if (input.id === "side") {
        const sideValue = value.toLowerCase();
        if (sideValue !== "bride" && sideValue !== "groom") {
          containsErrors = true;
          input.classList.add("error");
        }
      }
    }
  }

  if (!containsErrors) {
    addParticipant(person);
    toggleModal(person);
  }
};

submitButton.addEventListener('click', validateForm);

// Modal Handling
const toggleModal = (person) => {
  const modal = document.getElementById("success-modal");
  const modalText = document.getElementById("modal-text");
  const modalImage = document.getElementById("modal-image");

  modal.style.display = "flex";

  modalText.textContent = `You’re the sprinkles on our wedding cake 🍰✨, ${person.name}. Thanks for saying yes to the invite! 🎉 We can’t wait to celebrate this special day with you. Your presence will make it all the more magical. Get ready for a day full of love, laughter, and unforgettable memories! 💕🎶`;

  let scale = 1;
  let growing = true;

  const animateImage = () => {
    if (growing) {
      scale += 0.01;
      if (scale >= 1.2) growing = false;
    } else {
      scale -= 0.01;
      if (scale <= 1) growing = true;
    }
    modalImage.style.transform = `scale(${scale})`;
  };

  window.modalAnimationInterval = setInterval(animateImage, 20);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(window.modalAnimationInterval);
    modalImage.style.transform = "scale(1)";
  }, 5000);
};

const closeModal = () => {
  const modal = document.getElementById("success-modal");
  modal.style.display = "none";

  const modalImage = document.getElementById("modal-image");
  if (modalImage) {
    modalImage.style.transform = "scale(1)";
  }

  if (window.modalAnimationInterval) {
    clearInterval(window.modalAnimationInterval);
    window.modalAnimationInterval = null;
  }
};

const closeButton = document.getElementById("close-modal-button");
closeButton.addEventListener("click", closeModal);

// Carousel Logic
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-button.prev');
const nextBtn = document.querySelector('.carousel-button.next');
if (track && prevBtn && nextBtn) {
  const slides = Array.from(track.children);
  const slideWidth = slides[0].getBoundingClientRect().width;

  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });

  let currentSlide = 0;

  function updateSlidePosition() {
    track.style.transform = 'translateX(-' + (slideWidth * currentSlide) + 'px)';
  }

  nextBtn.addEventListener('click', () => {
    if (currentSlide < slides.length - 2) {
      currentSlide += 2;
      updateSlidePosition();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide -= 2;
      updateSlidePosition();
    }
  });
}

// Countdown
const weddingDate = new Date("2025-07-01T00:00:00");
const countdownText = document.getElementById("countdown-text");

const updateCountdown = () => {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdownText.textContent = "🎉 It's Wedding Day! Let's Celebrate!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownText.textContent = `💍 ${days}d ${hours}h ${minutes}m ${seconds}s to go!`;
};

setInterval(updateCountdown, 1000);
updateCountdown();

// Scroll buttons
document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("sigunp-button");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      document.getElementById("rsvp").scrollIntoView({ behavior: "smooth" });
    });
  }

  const scheduleBtn = document.getElementById("schedule-button");
  if (scheduleBtn) {
    scheduleBtn.addEventListener("click", () => {
      document.getElementById("schedule").scrollIntoView({ behavior: "smooth" });
    });
  }
});
