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

