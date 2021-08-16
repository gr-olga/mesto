export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._closeButton = document.querySelector('.popup__btn-close');
        this._popupElement = document.querySelector(this._popupSelector)
    }

    open() {
        this._popupElement.classList.add('popup_is-open');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_is-open');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        const escapeButtonCode = 27;
        if (evt.keyCode === escapeButtonCode) {
            const openedPopup = document.querySelector('.popup_is-open');
            this.close(openedPopup)
        }
    }

    setEventListeners(popupElementList) {
        this._closeButton.addEventListener('click', close);
        popupElementList.forEach((popup) => {
            popup.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup')) {
                    this.close(evt.target)
                }
            })
        })
    }

}

