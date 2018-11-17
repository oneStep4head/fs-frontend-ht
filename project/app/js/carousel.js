
var slideWidth = 300; 
var sliderList = document.querySelector('.slider__list');
var slides = document.querySelectorAll('.slider__item');
var btnPrev = document.querySelector('#prev_slide');
var btnNext = document.querySelector('#next_slide');

var pos = 0;


sliderList.style.width = slides.length * slideWidth + 'px';

btnPrev.onclick = scrollToPrev;
btnNext.onclick = scrollToNext;

function scrollToPrev() {
  pos--;
  
  if (pos < 0) {
    sliderList.style.transition = null;
    sliderList.style.left = -(pos + 2) * slideWidth + 'px';
    var cloneElem = sliderList.children[slides.length - 1].cloneNode(true);
    sliderList.insertBefore(cloneElem, sliderList.children[0]);
    sliderList.removeChild(sliderList.children[slides.length]);
    pos++;
  }
  
  setTimeout(function() {
    sliderList.style.left = -(slideWidth * pos) + 'px';
    sliderList.style.transition = 'left 0.6s ease-in-out';
  });

}

function scrollToNext() {
  pos++;
  
  if (pos > slides.length -1) {
    sliderList.style.transition = null;
    sliderList.style.left = -(pos - 2) * slideWidth + 'px';
    var cloneElem = sliderList.children[0].cloneNode(true);
    sliderList.appendChild(cloneElem);
    sliderList.removeChild(sliderList.children[0]);
    pos--;
  }
  
  setTimeout(function() {
    sliderList.style.left = -(slideWidth * pos) + 'px';
    sliderList.style.transition = 'left 0.6s ease-in-out';
  });
  
}
  