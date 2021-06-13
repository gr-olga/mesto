let popupElement = document.querySelector('.popup');
let openPopupElement = document.querySelector('.profile__edit-button');
let closePopupElement = document.querySelector('.popup__btn-close');
let profileNameElement = document.querySelector('.profile__name');
let profileExtraElement = document.querySelector('.profile__extra');
let inputNameElement = document.querySelector('.popup__input[name="name"]');
let inputExtraElement = document.querySelector('.popup__input[name="extra"]');
let formElement = document.querySelector('.popup__form');

let openPopup = function () {
    inputNameElement.value = profileNameElement.innerText;
    inputExtraElement.value = profileExtraElement.innerText;
    popupElement.classList.add('popup_is-open');
}

let closePopup = function () {
    popupElement.classList.remove('popup_is-open')
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    const nameValue = inputNameElement.value
    const extraValue = inputExtraElement.value

    profileNameElement.textContent = nameValue;
    profileExtraElement.textContent = extraValue;
    closePopup();
}

openPopupElement.addEventListener('click', openPopup);
closePopupElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);