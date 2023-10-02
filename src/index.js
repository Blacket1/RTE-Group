import './index.css';

//блок faq
const boxes = Array.from(document.querySelectorAll('.faq__box'));

boxes.forEach((box) => {
  box.addEventListener('click', boxHandler);
});

function boxHandler(e) {
  e.preventDefault();
  let currentBox = e.target.closest('.faq__box');
  let currentContent = e.target.nextElementSibling;

  currentBox.classList.toggle('faq__box_active');

  if (currentBox.classList.contains('faq__box_active')) {
    currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
  } else {
    currentContent.style.maxHeight = 0;
  }
}

//validate


const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const labelName = formElement.querySelector(`.${inputElement.id}-label`);
  const inputContainer = formElement.querySelector(`.${inputElement.id}-container`);
  inputContainer.classList.add('input__container_error');
  labelName.classList.add('input__label-name_error');
  errorElement.classList.add('input__error_active');
  errorElement.textContent = 'Поле обязательно для заполнения';
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const labelName = formElement.querySelector(`.${inputElement.id}-label`);
  const inputContainer = formElement.querySelector(`.${inputElement.id}-container`);
  inputContainer.classList.remove('input__container_error');
  labelName.classList.remove('input__label-name_error');
  errorElement.classList.remove('input__error_active');
  errorElement.textContent = '';
};

const showCheckboxError = (formElement) => {
  const checkbox = formElement.querySelector('.input_checkbox-pseudo');
  checkbox.classList.add('input_checkbox_error');
}

const hideCheckboxError = (formElement) => {
  const checkbox = formElement.querySelector('.input_checkbox-pseudo');
  checkbox.classList.remove('input_checkbox_error');
}


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, formElement) => {
  if (hasInvalidInput(inputList) || !formElement.checkValidity()) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove('button_inactive');
  }
};

const inputIsValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const checkboxIsValid = (formElement) => {
  if(!formElement.checked) {
    showCheckboxError(formElement);
  } else {
    hideCheckboxError(formElement);
  }
}

const inputHandler = (inputList, inputElement, formElement) => {
  const buttonElement = form.querySelector('.button__primary');
  inputElement.addEventListener('input', function() {
    toggleButtonState(inputList, buttonElement, formElement);
    inputIsValid(formElement, inputElement);
  })
}

const checkHandler = (inputList, buttonElement, formElement) => {
  formElement.addEventListener('click', function() {
    toggleButtonState(inputList, buttonElement, formElement);
    checkboxIsValid(formElement)
  })
}

const form = document.querySelector('.form__content');

function enableValidation () {
  const inputList = Array.from(form.querySelectorAll('.text'));
  const buttonElement = form.querySelector('.button__primary');
  checkHandler(inputList, buttonElement, form);
  checkboxIsValid(form);
  inputList.forEach((inputElement) => {
    toggleButtonState(inputList, buttonElement, form);
    inputIsValid(form, inputElement);
    inputHandler(inputList, inputElement, form);
  })
}

const userName = document.querySelector('#user-name');
const userPhone = document.querySelector('#user-phone');
const userText = document.querySelector('#goods-data');
const submitMessage = document.querySelector('.submit-message');
const closeButtonMessage = document.querySelectorAll('.submit-message__close-icon');

//открытие окна подтверждения 
function openSubmitMessage() {
  submitMessage.classList.add('submit-message_active');
}

//закрытие окна подтверждения
function closeSubmitMessage() {
  submitMessage.classList.remove('submit-message_active');
}

closeButtonMessage.forEach((item) => {
  const submitMessage = item.closest('.submit-message');
  submitMessage.addEventListener('click', function () {
    closeSubmitMessage();
  });
});

//функция собирающая текст из полей формы
function getFormData() {
  console.log(userName.value);
  console.log(userPhone.value);
  if(userText.value.length > 0) {
    console.log(userText.value);
  }
}
//обработчик кнопки, навешиваем если есть форма(избавляемся от ошибок на странице где нет форм)
if (form) {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    enableValidation();
    if (form.checkValidity()) {
      getFormData();
      openSubmitMessage();
    }
  });
}