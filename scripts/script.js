const popupElement = document.querySelector('.popup');
const openPopupElement = document.querySelector('.profile__edit-button');
const closePopupElement = document.querySelector('.popup__btn');
const saveProfileElement = document.querySelector('.popup__save');
const profileNameElement = document.querySelector('.profile__name');
const profileExtraElement = document.querySelector('.profile__extra');
const inputNameElement = document.querySelector('.input_name');
const inputExtraElement = document.querySelector('.input_extra');

const openPopup = function () {
    inputNameElement.value = profileNameElement.innerText;
    inputExtraElement.value = profileExtraElement.innerText;
    popupElement.classList.add('popup_is-open');
}

const closePopup = function () {
    popupElement.classList.remove('popup_is-open')
}


openPopupElement.addEventListener('click', openPopup);
closePopupElement.addEventListener('click', closePopup);

