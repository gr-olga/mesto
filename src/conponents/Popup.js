export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__btn-close');
        this._popupElementList = document.querySelectorAll('.popup');
        this._handleEscClose = this._handleEscClose.bind(this);
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
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
        this._popupElementList.forEach((popup) => {
            popup.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup')) {
                    this.close(evt.target)
                }
            })
        })
    }

}

