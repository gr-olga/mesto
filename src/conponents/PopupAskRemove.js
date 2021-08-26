import {Popup} from "./Popup";

export class PopupAskRemove extends Popup {
    constructor(popupSelector, submitDelete) {
        super(popupSelector);
        this._btnAgree = document.querySelector('.popup__save_small')
        this._submitDelete = submitDelete
    }

    setEventListeners() {
        super.setEventListeners();
        this._btnAgree.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._submitDelete()
        })
    }

    // setDeleteListener() {
    //     super.setEventListeners();
    //     this._formElement.addEventListener('submit', (evt) => {
    //         evt.preventDefault();
    //         this._submitDelete()
    //     })
    // }
}