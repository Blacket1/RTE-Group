import "./index.css";

//блок faq
const boxes = Array.from(document.querySelectorAll('.faq__box'));

boxes.forEach((box) => {
  box.addEventListener('click', boxHandler)
});

function boxHandler(e) {
  e.preventDefault();
  let currentBox = e.target.closest('.faq__box');
  let currentContent = e.target.nextElementSibling;
  
  currentBox.classList.toggle('faq__box_active');
  
  if(currentBox.classList.contains('faq__box_active')) {
    currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
  } else {
    currentContent.style.maxHeight = 0;
  }
}