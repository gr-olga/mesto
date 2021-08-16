class PopupWithForm extends Popup {
    constructor(popupSelector,) {
        super(popupSelector);
        this._formElement = document.querySelector('.popup__form');
        this._inputElement = document.querySelector('.popup__input');
    }

    _getInputValues() {
        const input1 = this._inputElement.value
        // const input2 =
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', () => {
        })
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}