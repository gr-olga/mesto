function toggleButtonState(inputList, buttonElement, config) {
    if (hasInputInvalid(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.setAttribute('disable', true)
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.removeAttribute('disable')
    }
}

function hasInputInvalid(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    });
}

function showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.inputErrorClass);
}

function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.errorClass);
    errorElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
}

function isValid(formElement, inputElement, config) {
    const errorMessage = inputElement.validationMessage

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, errorMessage, config);
    } else {
        hideInputError(formElement, inputElement, config)
    }
}

function setEventListener(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (event) => {
            isValid(formElement, inputElement, config)
            toggleButtonState(inputList, buttonElement, config)
        })
    })
}

function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListener(formElement, config);
    })
}

enableValidation(config);