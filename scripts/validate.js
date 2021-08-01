// function toggleButtonState(inputList, buttonElement, config) {
//     if (hasInputInvalid(inputList)) {
//         buttonElement.classList.add(config.inactiveButtonClass);
//         buttonElement.setAttribute('disable', true)
//     } else {
//         buttonElement.classList.remove(config.inactiveButtonClass);
//         buttonElement.removeAttribute('disable')
//     }
// }
//
// function hasInputInvalid(inputList) {
//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid
//     });
// }

// function showInputError(formElement, inputElement, errorMessage, config) {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     inputElement.classList.add(config.errorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(config.inputErrorClass);
// }
//
// function hideInputError(formElement, inputElement, config) {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     inputElement.classList.remove(config.errorClass);
//     errorElement.classList.remove(config.inputErrorClass);
//     errorElement.textContent = '';
// }

// function isValid(formElement, inputElement, config) {
//     const errorMessage = inputElement.validationMessage
//
//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, errorMessage, config);
//     } else {
//         hideInputError(formElement, inputElement, config)
//     }
// }
//
// function setEventListener(formElement, config) {
//     const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//     const buttonElement = formElement.querySelector(config.submitButtonSelector);
//     inputList.forEach(inputElement => {
//         inputElement.addEventListener('input', (event) => {
//             isValid(formElement, inputElement, config)
//             toggleButtonState(inputList, buttonElement, config)
//         })
//     })
// }
//
// function enableValidation(config) {
//     const formList = document.querySelectorAll(config.formSelector);
//     formList.forEach(formElement => {
//         formElement.addEventListener('submit', (evt) => {
//             evt.preventDefault();
//         })
//         setEventListener(formElement, config);
//     })
// }

// enableValidation(config);

class FormValidator {

    constructor(configSelectors, formElement) {
        this._formSelector = configSelectors.formSelector;
        this._inputSelector = configSelectors.inputSelector;
        this._submitButtonSelector = configSelectors.submitButtonSelector;
        this._inactiveButtonClass = configSelectors.inactiveButtonClass;
        this._inputErrorClass = configSelectors.inputErrorClass;
        this._errorClass = configSelectors.errorClass;
        this._formElement = formElement;
    }

    _isValid(formElement) {
        const errorMessage = this._inputSelector.validationMessage

        if (!this._inputSelector.validity.valid) {
            this._showInputError();
        } else {
            this._hideInputError();
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${this._inputSelector.id}-error`);
        this._inputSelector.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${this._inputSelector.id}-error`);
        this._inputSelector.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _hasInputInvalid(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });
    }

    _toggleButtonState(inputList) {
        if (this._hasInputInvalid(inputList)) {
            this._submitButtonSelector.classList.add(this._inactiveButtonClass);
            this._submitButtonSelector.setAttribute('disable', true)
        } else {
            this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
            this._submitButtonSelector.removeAttribute('disable')
        }
    }

    _setEventListener(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', (event) => {
                this._isValid();
                this._toggleButtonState()
            })
        })
    }

    _enableValidation() {
        const formList = document.querySelectorAll(this._formSelector);
        formList.forEach(formElement => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            })
            this._setEventListener(formElement);
        })
    }

    _enableValidation();

}