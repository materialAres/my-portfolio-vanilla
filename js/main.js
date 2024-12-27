/* Slide start */
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
/* Slide end */

function goToDescription(descriptionNumber, event) {
  // Prevent event bubbling
  event.stopPropagation();
  
  // Hide the slideshow container
  const container = document.getElementById('slideshow-container');
  if (container) {
      container.style.display = "none";
  } else {
      console.error('Slideshow container not found!');
  }

  if (descriptionNumber === 0) {
    document.getElementById('about-me').style.display = "block";
    document.getElementById('about-me').style.animation = "fadeIn 1.5s ease-in forwards";
  } else if (descriptionNumber === 1) {
    document.getElementById('work').style.display = "block";
    document.getElementById('work').style.animation = "fadeIn 1.5s ease-in forwards";
  } else if (descriptionNumber === 2) {
    document.getElementById('contacts').style.display = "block";
    document.getElementById('contacts').style.animation = "fadeIn 1.5s ease-in forwards";
  }
}

function goBack(descriptionNumber, event) {
  // Prevent event bubbling
  event.stopPropagation();
  
  // Hide the slideshow container
  const container = document.getElementById('slideshow-container');
  if (container) {
      container.style.display = "block";
  } else {
      console.error('Slideshow container not found!');
  }

  if (descriptionNumber === 0) {
    document.getElementById('about-me').style.display = "none";
  } else if (descriptionNumber === 1) {
    document.getElementById('work').style.display = "none";
  } else if (descriptionNumber === 2) {
    document.getElementById('contacts').style.display = "none";
  }
}