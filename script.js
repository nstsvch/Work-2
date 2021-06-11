//Кнопка - что дальше?
let slide2 = document.getElementById("slide2");
let btn = document.querySelector('.what-next');

function handleButtonClick() {
  slide2.scrollIntoView({block: "center", behavior: "smooth"});
}
btn.addEventListener('click', handleButtonClick);

//Слайдер
let slider = document.querySelector('.slideshow');
let sliderlist = document.querySelector('.slidelist');
let slides = document.querySelectorAll('.slide');
slideWidth = slides[0].offsetWidth,
slideIndex = 0,
posInit = 0,
posX1 = 0,
posX2 = 0,
posFinal = 0,
posThreshold = slideWidth / 3,
trfRegExp = /([-0-9.]+(?=px))/,

getEvent = function() {
  return (event.type.search('touch') !== -1) ? event.touches[0] : event;
},

slide = function() {
  sliderlist.style.transition = 'transform .5s';
  sliderlist.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
},

swipeStart = function() {
  let evt = getEvent();
  posInit = posX1 = evt.clientX;
  sliderlist.style.transition = '';
  document.addEventListener('touchmove', swipeAction);
  document.addEventListener('mousemove', swipeAction);
  document.addEventListener('touchend', swipeEnd);
  document.addEventListener('mouseup', swipeEnd);
},

swipeAction = function() {
  let evt = getEvent(),
  style = sliderlist.style.transform,
  transform = +style.match(trfRegExp)[0];
  posX2 = posX1 - evt.clientX;
  posX1 = evt.clientX;
  sliderlist.style.transform = `translateX(${transform - posX2}px)`;
},

swipeEnd = function() {
  posFinal = posInit - posX1;
  document.removeEventListener('touchmove', swipeAction);
  document.removeEventListener('mousemove', swipeAction);
  document.removeEventListener('touchend', swipeEnd);
  document.removeEventListener('mouseup', swipeEnd);

  if (Math.abs(posFinal) > posThreshold) {
    if (posInit < posX1) {
      slideIndex--;
    } else if (posInit > posX1) {
      slideIndex++;
    }
  }

  if (posInit !== posX1) {
    slide();
  }
};

sliderlist.style.transform = 'translateX(0px)';

slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);
 
//Пагинация
let slideNumber = 1;
let pagination_item = document.getElementsByClassName('pagination-item');
let first_block = document.querySelector('.advantages .first-list');
let second_block = document.querySelector('.advantages .second-list');

showSlides(slideNumber);

function nextSlide() {
    showSlides(slideNumber += 1);
    if (first_block.style.display != 'block') {
      pagination_item[0].style.background ="transparent";
      pagination_item[0].style.border ="1px solid black";
      pagination_item[1].style.background ="#ff6a9f";
      pagination_item[1].style.border ="none";
    }
}
function previousSlide() {
    showSlides(slideNumber -= 1);
    if (first_block.style.display == 'block') {
      pagination_item[0].style.background ="#ff6a9f";
      pagination_item[0].style.border ="none";
      pagination_item[1].style.background ="transparent";
      pagination_item[1].style.border ="1px solid black";
    }
}
function currentSlide(n) {
  showSlides(slideNumber = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("advantages-content");
    if (n > slides.length) {
      slideNumber = 1;
    }
    if (n < 1) {
      slideNumber = slides.length;
    }
    for (let slide of slides) {
        slide.style.display = "none";
    }
    if (n = 1) {
      pagination_item[0].style.background ="#ff6a9f";
      pagination_item[0].style.border ="none";
    }

    slides[slideNumber - 1].style.display = "block";
}

