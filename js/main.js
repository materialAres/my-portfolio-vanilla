/* Slide start */
let slideIndex = 1;

// Function to handle window resize
function handleResize() {
  const width = window.innerWidth;
  const slideshowContainer = document.getElementById('slideshow-container');
  const aboutMe = document.getElementById('about-me');
  const work = document.getElementById('work');
  const contacts = document.getElementById('contacts');

  // Reset all displays first
  if (slideshowContainer) slideshowContainer.style.display = "flex";
  if (aboutMe) aboutMe.style.display = "none";
  if (work) work.style.display = "none";
  if (contacts) contacts.style.display = "none";

  // Show appropriate slides based on width
  if (width <= 768) {
    showSlides(slideIndex);
  } else {
    // For desktop, show all slides
    const slides = document.getElementsByClassName("mySlides");
    for (const element of slides) {
      element.style.display = "block";
    }
  }
}

// Add resize event listener
window.addEventListener('resize', handleResize);

// Initial setup
handleResize();

// Next/previous controls
function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex);
}

// Thumbnail image controls
function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }

  if (n < 1) {
    slideIndex = slides.length
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    // Remove any active class if you're using one
    slides[i].classList.remove("active-slide");
  }
  
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // For mobile, we need to use flex-compatible display property
  if (window.innerWidth <= 768) {
    slides[slideIndex-1].style.display = "flex"; // Use flex instead of block
  } else {
    slides[slideIndex-1].style.display = "block";
  }
  
  // Add active class for styling purposes
  slides[slideIndex-1].classList.add("active-slide");
  
  if (dots.length > 0) {
    dots[slideIndex-1].className += " active";
  }
}
/* Slide end */

function goToDescription(descriptionId, event) {
  event.stopPropagation();

  if (window?.innerWidth <= 768) {
    toggleDescriptionsMobile(descriptionId);
  } else {
    toggleDescriptionsDesktop(descriptionId);
  }
}

function toggleDescriptionsMobile(descriptionId) {
  // Hide the slideshow container
  const container = document.getElementById('slideshow-container');

  if (container) {
    container.style.display = "none";
  } else {
    console.error('Slideshow container not found!');
  }

  const el = document.getElementById(descriptionId);

  if (el) {
    el.style.display = "block";
    el.style.animation = "fadeIn 1.5s ease-in forwards";
  } else {
    console.error(`Element with ID '${descriptionId}' not found!`);
  }
}

function toggleDescriptionsDesktop(descriptionId) {
  const elements = ['about-me', 'work', 'contacts'];

  elements.forEach(e => {
    const el = document.getElementById(e);

    if (!el) return;

    if (e === descriptionId) {
      el.style.display = "block";
      el.style.animation = "fadeIn 1.5s ease-in forwards";
    } else {
      el.style.display = "none";
    }
  });
}

function goBack(descriptionId, event) {
  // Prevent event bubbling
  event.stopPropagation();
  
  // Hide the slideshow container
  const container = document.getElementById('slideshow-container');
  if (container) {
    container.style.display = "flex";
  } else {
    console.error('Slideshow container not found!');
  }

  document.getElementById(descriptionId).style.display = "none";
}