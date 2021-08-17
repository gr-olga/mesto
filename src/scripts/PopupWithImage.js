import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector, link, title) {
        super(popupSelector);
        this._link = link;
        this._title = title;
        this._image = this._popupElement.querySelector('.popup__img')
    }

    open() {
        super.open()
        this._image.src = this._link;
        this._image.alt = this._title;
        document.querySelector('.popup__image-title').textContent = this._title;
    }
}