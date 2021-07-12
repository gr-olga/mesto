const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

function toggleButtonState(inputList, buttonElement) {
    if (hasInputInvalid(inputList)) {
        buttonElement.classList.add('popup__save_invalid');
        buttonElement.setAttribute('disable', true)
    } else {
        buttonElement.classList.remove('popup__save_invalid');
        buttonElement.removeAttribute('disable')
    }
}

function hasInputInvalid(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    });
}

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_invalid');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input_type-error_active');
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_invalid');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
}


function isValid(formElement, inputElement) {
    const errorMessage = inputElement.validationMessage

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, errorMessage);
    } else {
        hideInputError(formElement, inputElement)
    }

    const buttonElement = formElement.querySelector('.popup__save');
    toggleButtonState(inputList, buttonElement)
}

function setEventListener(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (event) => {
            isValid(formElement, inputElement)
        })
    })
}

function enableValidation(elementsObj) {
    const formList = document.querySelectorAll(elementsObj.formSelector);
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListener(formElement);
    })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__error_visible'
});