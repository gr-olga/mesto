export class FormValidator {

    constructor(configSelectors, formElement) {
        this._inputSelector = configSelectors.inputSelector;
        this._submitButtonSelector = configSelectors.submitButtonSelector;
        this._inactiveButtonClass = configSelectors.inactiveButtonClass;
        this._inputErrorClass = configSelectors.inputErrorClass;
        this._errorClass = configSelectors.errorClass;
        this._formElement = formElement;
    }

    _isValid(inputElement) {
        const errorMessage = inputElement.validationMessage

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, errorMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _hasInputInvalid(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInputInvalid(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', true)
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled')
        }
    }

    _setEventListener() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', (event) => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListener(this._formElement);
    }

}
