import {Popup} from "./Popup";

class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFn) {
        super(popupSelector);
        this._submitFormFn = submitFormFn;
        this._formElement = document.querySelector('.popup__form');
        this._inputElements = this._formElement.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        const result = {}
        this._inputElements.forEach(inputEl => {
            result.key = inputEl.id
            result.value = inputEl.value
        })
        return result;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', this._submitFormFn)
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}