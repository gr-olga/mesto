import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupElement.querySelector('.popup__img');
        this._imageTitle = this._popupElement.querySelector('.popup__image-title');
    }

    open(link, title) {
        super.open()
        this._image.src = link;
        this._image.alt = title;
        this._imageTitle.textContent = this._title;
    }
}