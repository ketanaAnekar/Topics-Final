const infoSection = document.querySelector('.info-section');
const scrollText = document.querySelector('.scroll-text');
const illustrationsContainer = document.querySelector('.illustrations-container');
let isTyping = false; // To prevent multiple typewriter triggers

// Function to create and style a centered illustration
function createIllustration() {
  const patch = document.createElement('img');
  patch.src = 'Asset 31.png'; // Set your illustration source here
  patch.className = 'patch-illustration';
  patch.style.opacity = '0'; // Start hidden
  patch.style.transition = 'opacity 1s ease'; // Smooth fade-in
  return patch;
}









document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".scroll-container");
  const images = Array.from(document.querySelectorAll(".scroll-image"));

  // Clone images to create a seamless loop
  images.forEach((image) => {
    const clone = image.cloneNode(true);
    scrollContainer.appendChild(clone);
  });

  let scrollOffset = 0;

  function scrollImages() {
    // Move the container upwards
    scrollOffset += 3.5;

    // Reset the scroll offset if we've scrolled through one set of images
    if (scrollOffset >= scrollContainer.scrollHeight / 2) {
      scrollOffset = 0;
    }

    // Apply the scroll offset
    scrollContainer.style.transform = `translateY(-${scrollOffset}px)`;

    // Keep scrolling
    requestAnimationFrame(scrollImages);
  }

  // Start the scrolling effect
  scrollImages();
});

// Function to add illustrations in a vertical stack
function addIllustrationsStacked() {
  for (let i = 0; i < 1; i++) {
    const illustration = createIllustration();
    illustrationsContainer.appendChild(illustration);

    requestAnimationFrame(() => {
      illustration.style.opacity = '0.8'; // Fade in to 80% opacity
    });
  }
}

// Function to handle typewriter effect
function typewriterEffect(element, text, speed = 50) {
  let index = 0;
  isTyping = true; // Mark typing as in progress
  element.textContent = ''; // Clear text initially
  const interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text[index]; // Add one character at a time
      index++;
    } else {
      clearInterval(interval); // Stop when the text is fully typed
      isTyping = false; // Mark typing as complete
    }
  }, speed);
}

// Intersection Observer callback
function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Trigger typewriter effect when section is in view
      if (!scrollText.classList.contains('typed-out') && !isTyping) {
        const fullText = scrollText.getAttribute('data-text'); // Get the full text
        typewriterEffect(scrollText, fullText, 50); // Adjust speed if needed
        scrollText.classList.add('typed-out');
      }

      // Add illustrations if not already added
      if (!illustrationsContainer.classList.contains('illustrations-added')) {
        addIllustrationsStacked();
        illustrationsContainer.classList.add('illustrations-added');
      }
    } else {
      // Clear text and reset only if not typing
      if (!isTyping) {
        scrollText.textContent = scrollText.getAttribute('data-text'); // Reset to full text
        scrollText.classList.remove('typed-out'); // Reset typewriter effect
      }
      illustrationsContainer.innerHTML = ''; // Clear illustrations
      illustrationsContainer.classList.remove('illustrations-added');
    }
  });
}

// Create an Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5 // Trigger when 50% of the section is visible
});

// Observe the info section
observer.observe(infoSection);

// Set the initial text for the scroll text
scrollText.setAttribute('data-text', scrollText.textContent); // Store the full text
const dynamicTextContainer = document.querySelector('.dynamic-text');
const fifthSectionWords = [
  { text: "BUT", top: 20, left: -2 },         // Always at the top
  { text: "WHAT'S", top: 32, left: -2 },     // Adjusted to be closer to "BUT"
  { text: "DIFFERENT", top: 44, left: -2 },  // Adjusted to be closer to "WHAT'S"
  { text: "ABOUT", top: 56, left: -2 },      // Adjusted to be closer to "DIFFERENT"
  { text: "S&P?", top: 68, left: -2 },       // Adjusted to be closer to "ABOUT"
];

let currentWordIndex = 0;

// Function to create and style individual word elements
function createWordElement(word, position) {
  const wordElement = document.createElement('span');
  wordElement.textContent = word.text;

  // Clamp positions within safe ranges
  const clampedTop = Math.min(Math.max(position.top, 5), 90); // Ensure top stays between 5%-90%
  const clampedLeft = Math.min(Math.max(position.left, 5), 95); // Ensure left stays between 5%-95%

  // Apply clamped position
  wordElement.style.position = 'absolute';
  wordElement.style.top = `${clampedTop}%`;
  wordElement.style.left = `${clampedLeft}%`;

  // Set uniform size
  wordElement.style.fontSize = `5.4rem`; // Uniform size for all words

  // Basic styling
  wordElement.style.color = 'white';
  wordElement.style.fontFamily = 'Tailsman';
  wordElement.style.lineHeight = '4rem';

  return wordElement;
}

// Function to display words in sequence, one at a time
function showWordsInSequence() {
  if (currentWordIndex < fifthSectionWords.length) {
    const word = fifthSectionWords[currentWordIndex];
    const wordElement = createWordElement(word, word);
    dynamicTextContainer.appendChild(wordElement);

    // Move to the next word after a delay
    currentWordIndex++;
    setTimeout(showWordsInSequence, 250); // Adjust delay between words
  }
}

// Intersection Observer callback for the fifth section
function handleFifthSection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentWordIndex = 0; // Reset index when section comes into view
      dynamicTextContainer.innerHTML = ''; // Clear previous words
      showWordsInSequence(); // Start word display
    }
  });
}

// Set up an Intersection Observer for the fifth section
const fifthSectionObserver = new IntersectionObserver(handleFifthSection, {
  threshold: 0.5, // Trigger when 50% of the section is visible
});

// Observe the fifth section
const fifthSection = document.querySelector('.background-image-section');
fifthSectionObserver.observe(fifthSection);

// Randomize positions for draggable images
document.querySelectorAll('.draggable-image').forEach((image) => {
  const randomX = Math.random();
  const randomY = Math.random();
  image.style.setProperty('--random-x', randomX);
  image.style.setProperty('--random-y', randomY);

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // Desktop: Mouse Events
  image.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - image.offsetLeft;
    offsetY = e.clientY - image.offsetTop;
    image.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    image.style.left = `${e.clientX - offsetX}px`;
    image.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    image.style.cursor = 'grab';
  });

  // Mobile: Touch Events
  image.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - image.offsetLeft;
    offsetY = touch.clientY - image.offsetTop;
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    image.style.left = `${touch.clientX - offsetX}px`;
    image.style.top = `${touch.clientY - offsetY}px`;
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });
});

// Sequentially display "STICK" and "SHEET"
const wordOne = document.querySelector('.word-one');
const wordTwo = document.querySelector('.word-two');
const sixthSection = document.querySelector('.sixth-section');

function showStickAndSheet() {
  wordOne.style.opacity = '1'; // Show "STICK"
  setTimeout(() => {
    wordTwo.style.opacity = '1'; // Show "SHEET" after a delay
  }, 500);
}

const sixthSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      showStickAndSheet();
    } else {
      wordOne.style.opacity = '0'; // Reset text opacity
      wordTwo.style.opacity = '0';
    }
  });
}, { threshold: 0.5 });

sixthSectionObserver.observe(sixthSection);

const typewriterContainer = document.querySelector('.typewriter-container');
const typewriterTitle = document.querySelector('#typewriter-title');
const typewriterBody = document.querySelector('#typewriter-body');

const eighthSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Start the typewriter effect when section is in view
      if (!typewriterContainer.classList.contains('typed-out')) {
        typewriterEffect(typewriterTitle, "STICK SHEET", () => {
          typewriterEffect(
            typewriterBody,
            "Each Stick & Peel product comes with a Stick Sheet and one sticker. Add your sticker to the sheet to start earning rewards! Fill 5 spots for a free product under $10. Complete two full sheets for a $20 reward. Self-care that sticks with you!"
          );
        });
        typewriterContainer.classList.add('typed-out'); // Avoid triggering again
      }
    }
  });
}, { threshold: 0.5 });

// Typewriter effect function
function typewriterEffect(element, text, callback = null, speed = 50) {
  element.style.visibility = 'visible'; // Show the element
  let index = 0;
  element.textContent = ''; // Clear initial text

  const interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text[index]; // Add one character at a time
      index++;
    } else {
      clearInterval(interval); // Stop the interval when done
      if (callback) callback(); // Call the next function, if provided
    }
  }, speed);
}

// Observe the 8th section
eighthSectionObserver.observe(document.querySelector('.eighth-section'));

const stickersContainer = document.querySelector('.stickers-container');
const stickerImages = [
  'sticker1.png',
  'sticker2.png',
  'sticker3.png',
  'sticker4.png',
  'sticker5.png',
  'sticker6.png',
  'sticker7.png',
  'sticker8.png',
];

function createSticker() {
  const sticker = document.createElement('img');
  sticker.src = stickerImages[Math.floor(Math.random() * stickerImages.length)];
  sticker.className = 'sticker';

  // Randomize position
  sticker.style.top = `${Math.random() * 90}%`; // Stay within screen bounds
  sticker.style.left = `${Math.random() * 90}%`;

  // Add a random rotation and scaling effect
  sticker.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.8 + 0.8})`;

  stickersContainer.appendChild(sticker); // Add sticker to the container
}

function generateStickers() {
  setInterval(() => {
    createSticker();
  }, 50); // Add a sticker every 200ms
}

// Intersection Observer for the 7th section
const seventhSection = document.querySelector('.seventh-section');
const seventhSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      generateStickers(); // Start generating stickers when the section is visible
      seventhSectionObserver.unobserve(seventhSection); // Stop observing once stickers start appearing
    }
  });
}, { threshold: 0.5 });

seventhSectionObserver.observe(seventhSection);

let video;
let faceapi;
let detections;

let foreheadImage, eyePatchImage, noseStripImage, chinPatchImage;

function preload() {
    // Load illustrations
    foreheadImage = loadImage('assets/forehead-patch.png');
    eyePatchImage = loadImage('assets/eye-patch.png');
    noseStripImage = loadImage('assets/nose-strip.png');
    chinPatchImage = loadImage('assets/pimple-patch.png');
}

function setup() {
    const canvas = createCanvas(640, 480);
    canvas.parent('video-container'); // Place canvas in the specified container

    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    faceapi = ml5.faceApi(video, {
        withLandmarks: true,
        withDescriptors: false,
    }, modelLoaded);
}

function modelLoaded() {
    console.log('FaceAPI Model Loaded');
    faceapi.detect(gotResults); // Start detection
}

function gotResults(err, result) {
    if (err) {
        console.error(err);
        return;
    }
    detections = result;
    faceapi.detect(gotResults); // Continuous detection
}

function draw() {
    background(0);

    // Draw video
    if (video) {
        image(video, 0, 0, width, height);
    }

    if (detections && detections.length > 0) {
        const parts = detections[0].parts;

        if (parts) {
            // Forehead patch
            let foreheadX = parts.silhouette[10]._x - 50;
            let foreheadY = parts.silhouette[10]._y - 80;
            image(foreheadImage, foreheadX, foreheadY, 100, 50);

            // Left eye patch
            let leftEyeX = parts.leftEye[0]._x - 25;
            let leftEyeY = parts.leftEye[0]._y + 10;
            image(eyePatchImage, leftEyeX, leftEyeY, 60, 30);

            // Right eye patch
            let rightEyeX = parts.rightEye[3]._x - 25;
            let rightEyeY = parts.rightEye[3]._y + 10;
            image(eyePatchImage, rightEyeX, rightEyeY, 60, 30);

            // Nose strip
            let noseX = parts.nose[3]._x - 30;
            let noseY = parts.nose[3]._y;
            image(noseStripImage, noseX, noseY, 60, 30);

            // Chin patches
            let chinX = parts.silhouette[16]._x - 15;
            let chinY = parts.silhouette[16]._y + 20;
            image(chinPatchImage, chinX, chinY, 30, 30);

            let chinLeftX = chinX - 35;
            image(chinPatchImage, chinLeftX, chinY, 30, 30);

            let chinRightX = chinX + 35;
            image(chinPatchImage, chinRightX, chinY, 30, 30);
        }
    }
  }

  console.log("ml5 version:", ml5.version); // Add to `script.js`
  console.log("Custom script loaded!");
