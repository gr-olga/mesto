class PopupWithImage extends Popup {
    constructor(popupSelector, link, title) {
        super(popupSelector);
        this._link = link;
        this._title = title;
    }

    open() {
        super.open()
        this._popupElement.querySelector('.popup__img').src = this._link;
        this._popupElement.querySelector('.popup__img').alt = this._title;
        this._popupElement.querySelector('.popup__image-title').textContent = this._title;
    }

}