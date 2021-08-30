import {Popup} from "./Popup";

export class PopupAskRemove extends Popup {
    constructor(popupSelector, submitDelete) {
        super(popupSelector);
        this._btnAgree = document.querySelector('.popup__save-small')
        this._submitDelete = submitDelete
    }

    setEventListeners() {
        super.setEventListeners();
        this._btnAgree.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._submitDelete(this._id, this._element);
        })
    }

    open(id, element) {
        super.open();
        this._id = id;
        this._element = element
    }

    close() {
        super.close();
        this._btnAgree.removeEventListener('click', this._submitDelete)
    }

}