export class FormValidator {

    constructor(configSelectors, formElement) {
        this._inputSelector = configSelectors.inputSelector;
        this._submitButtonSelector = configSelectors.submitButtonSelector;
        this._inactiveButtonClass = configSelectors.inactiveButtonClass;
        this._inputErrorClass = configSelectors.inputErrorClass;
        this._errorClass = configSelectors.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
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

    _hasInputInvalid() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });
    }

    toggleButtonState() {
        if (this._hasInputInvalid(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true)
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled')
        }
    }

    _setEventListener() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', (event) => {
                this._isValid(inputElement);
                this.toggleButtonState();
            })
        })
    }

    resetValidation() {
        this._inputList.forEach(inputElement => this._hideInputError(inputElement))
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled')
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListener(this._formElement);
    }

}
