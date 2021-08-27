import {Popup} from "./Popup";

 export class PopupWithForm extends Popup {
     constructor(popupSelector, submitFormFn) {
         super(popupSelector);
         this._submitFormFn = submitFormFn;
         this._formElement = this._popupElement.querySelector('.popup__form');
         this._inputElements = this._formElement.querySelectorAll('.popup__input');
         this._formValues = this._formElement.value;
         this.saveBtn = this._popupElement.querySelector('.popup__save');
     }

     _getInputValues() {
         this._inputList = this._inputElements;
         this._formValues = {};
         this._inputList.forEach(input => this._formValues[input.name] = input.value);
         return this._formValues;
     }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormFn(this._getInputValues())
        })
    }

     close() {
         super.close();
         this._formElement.reset();
     }

     renderLoading(isLoading) {
         if (isLoading) {
             this.saveBtn.textContent = 'Сохранение...'
         } else {
             this.saveBtn.textContent = 'Сохранить'

         }
     }
 }

