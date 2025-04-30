/*** You will not need this file until Unit 5 ***/
/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");
// Step 2: Write the callback function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
    // This section will run whenever the button is clicked
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener('click', toggleDarkMode);

/*** Form Handling [PLACEHOLDER] [ADDED IN UNIT 6] ***
Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here
const submitButton = document.getElementById('rsvp-button');
let count = 3; 

const addParticipant = (person) => {
    // Step 2: Write your code to manipulate the DOM here

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

// Step 3: Add a click event listener to the submit RSVP button here


/*** Form Validation [PLACEHOLDER] [ADDED IN UNIT 7] ***
Purpose:
- Prevents invalid form submissions from being added to the list of participants.

When To Modify:
- [ ] Project 7 (REQUIRED FEATURE)
- [ ] Project 7 (STRETCH FEATURE)
- [ ] Project 9 (REQUIRED FEATURE)
- [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = (event) => {
  event.preventDefault();

  let containsErrors = false;
  const rsvpInputs = document.getElementById("rsvp-form").elements;

  let person = {
    name: rsvpInputs[0].value.trim(),
    email: rsvpInputs[1].value.trim(),
    side: rsvpInputs[2].value.trim()
  };

  // Loop through all inputs
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

  // If no errors, call addParticipant() and clear fields
if (!containsErrors) {
  addParticipant(person);
  toggleModal(person);
  }
};

// Add event listener for form submission
submitButton.addEventListener('click', validateForm);

/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/
/*** Success Modal [ADDED IN UNIT 9] 
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [x] Project 9 (REQUIRED FEATURE)
  - [x] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/
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

  // Reset image scale if still animating
  const modalImage = document.getElementById("modal-image");
  if (modalImage) {
    modalImage.style.transform = "scale(1)";
  }

  // Stop animation if running
  if (window.modalAnimationInterval) {
    clearInterval(window.modalAnimationInterval);
    window.modalAnimationInterval = null;
  }
};

const closeButton = document.getElementById("close-modal-button");
closeButton.addEventListener("click", closeModal);
