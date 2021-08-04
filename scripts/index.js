import {FormValidator} from "./FormValidator.js";
import {Card} from "./Card.js";

const editProfilePopupElement = document.querySelector('#edit_profile_popup');
const addCardPopupElement = document.querySelector('#add_card_popup');

const openPopupElement = document.querySelector('.profile__edit-button');
const openAddCardPopupElement = document.querySelector('.profile__add-card-button');

const editPopupCloseButtonElement = editProfilePopupElement.querySelector('.popup__btn-close');
const addPopupCloseButtonElement = addCardPopupElement.querySelector('.popup__btn-close');

const profileNameElement = document.querySelector('.profile__name');
const profileExtraElement = document.querySelector('.profile__extra');

const inputNameElement = document.querySelector('.popup__input[name="profileName"]');
const inputExtraElement = document.querySelector('.popup__input[name="extra"]');

const formProfile = document.querySelector('.popup__form[name = "profileInfo"]');
const formCardElement = document.querySelector('.popup__form[name = "newPlace"]');


const inputCardTitleElement = document.querySelector('.popup__input[name="cardTitle"]');
const inputCardLinkElement = document.querySelector('.popup__input[name="link"]');


const escapeButtonCode = 27;
const popupElementList = document.querySelectorAll('.popup')

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_invalid',
    inputErrorClass: 'popup__message-error_active',
    errorClass: 'popup__input_invalid'
}

const cardValidationProfile = new FormValidator(config, formProfile);
const cardValidationCardElement = new FormValidator(config, formCardElement);
cardValidationProfile.enableValidation()
cardValidationCardElement.enableValidation()


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


const itemPopup = document.querySelector('#show_card')
const cardsGrid = document.querySelector('.cards-grid');

function renderCard(cardElement) {
    cardsGrid.prepend(cardElement);
}

function createCard(link, name) {
    const card = new Card(link, name, '#card', createPopupCard);
    return card.generateCard();
}

initialCards.forEach((item) => {
    const cardElement = createCard(item.link, item.name)
    // createPopupCard(item.link, item.name);
    renderCard(cardElement);
});

function createPopupCard(link, title) {
    openPopup(itemPopup);
    itemPopup.querySelector('.popup__img').src = link;
    itemPopup.querySelector('.popup__img').alt = title;
    itemPopup.querySelector('.popup__image-title').textContent = title;
}

const closeImg = document.querySelector('.popup__card-btn-close');
closeImg.addEventListener('click', () => closePopup(itemPopup));

function openPopup(el) {
    el.classList.add('popup_is-open');
    document.addEventListener('keydown', closeOnESC);
}

function closePopup(el) {
    el.classList.remove('popup_is-open');
    document.removeEventListener('keydown', closeOnESC);
    el.querySelector('.popup__form').reset();
    cardValidationProfile.resetValidation();
    cardValidationCardElement.resetValidation();
}

const openEditPopup = function () {
    inputNameElement.value = profileNameElement.innerText;
    inputExtraElement.value = profileExtraElement.innerText;
    openPopup(editProfilePopupElement);
}

function submitProfileForm(evt) {
    evt.preventDefault();
    const nameValue = inputNameElement.value
    const extraValue = inputExtraElement.value
    profileNameElement.textContent = nameValue;
    profileExtraElement.textContent = extraValue;
    closePopup(editProfilePopupElement);
}

const openAddCardPopup = function () {
    inputCardTitleElement.value = '';
    inputCardLinkElement.value = '';
    openPopup(addCardPopupElement);
    formCardElement.reset();
}

function submitCardForm(evt) {
    evt.preventDefault();
    const titleValue = inputCardTitleElement.value
    const linkValue = inputCardLinkElement.value
    const cardElement = createCard(linkValue, titleValue, createPopupCard);
    // createPopupCard(item.link, item.name);
    renderCard(cardElement);
    closePopup(addCardPopupElement);
    formCardElement.reset();

}

openAddCardPopupElement.addEventListener('click', openAddCardPopup);
addPopupCloseButtonElement.addEventListener('click', () => closePopup(addCardPopupElement))
formCardElement.addEventListener('submit', submitCardForm);

openPopupElement.addEventListener('click', openEditPopup);
editPopupCloseButtonElement.addEventListener('click', () => closePopup(editProfilePopupElement));
formProfile.addEventListener('submit', submitProfileForm);


popupElementList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(evt.target)
        }
    });
})

function closeOnESC(evt) {
    if (evt.keyCode === escapeButtonCode) {
        const openedPopup = document.querySelector('.popup_is-open');
        closePopup(openedPopup);
    }
}

