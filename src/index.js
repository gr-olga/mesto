import '../styles/index.css';
import {FormValidator} from "../scripts/FormValidator.js";
import {Card} from "../scripts/Card.js";
import {Section} from "../scripts/Section.js";
import {PopupWithImage} from "../scripts/PopupWithImage";
import {PopupWithForm} from "../scripts/PopupWithForm";


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

const cardGridSelector = '.cards-grid'

function createCard(link, name) {
    const card = new Card(link, name, '#card', handleCardClick);
    return card.generateCard();
}


const section = new Section({items: initialCards, renderer: createCard}, cardGridSelector);
const renderedElements = section.renderAllElements();
renderedElements.forEach((item) => section.addItem(item));

function handleCardClick(link, title) {
    const popupWithImage = new PopupWithImage('.popup_card', link, title);
    popupWithImage.open();
    const closeImg = document.querySelector('.popup__card-btn-close');
    closeImg.addEventListener('click', () => popupWithImage.close());
}


const openEditPopup = function () {
    inputNameElement.value = profileNameElement.innerText;
    inputExtraElement.value = profileExtraElement.innerText;
    openPopup(editProfilePopupElement);
    cardValidationProfile.resetValidation();
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
    openPopup(addCardPopupElement);
    formCardElement.reset();
    cardValidationCardElement.resetValidation();
    cardValidationCardElement.toggleButtonState();
}

function submitCardForm(evt) {
    evt.preventDefault();
    const titleValue = inputCardTitleElement.value
    const linkValue = inputCardLinkElement.value
    const cardElement = createCard(linkValue, titleValue, createPopupCard);
    renderCard(cardElement);
    closePopup(addCardPopupElement);
    formCardElement.reset();
}

function openEditPopupWithForm() {
    const popupWithForm = new PopupWithForm('#edit_profile_popup', () => console.log('xuinya'))
    popupWithForm.open();
    editPopupCloseButtonElement.addEventListener('click', () => popupWithForm.close());
}

function openCardPopupWithForm() {
    const popupWithForm = new PopupWithForm('#add_card_popup', () => console.log('xuinya'))
    popupWithForm.open();
    popupWithForm.setEventListeners();
    // addPopupCloseButtonElement.addEventListener('click', () => popupWithForm.close());
}

openAddCardPopupElement.addEventListener('click', openEditPopupWithForm);
// addPopupCloseButtonElement.addEventListener('click', () => closePopup(addCardPopupElement))
// formCardElement.addEventListener('submit', submitCardForm);

openPopupElement.addEventListener('click', openCardPopupWithForm);
// editPopupCloseButtonElement.addEventListener('click', () => closePopup(editProfilePopupElement));
// formProfile.addEventListener('submit', submitProfileForm);


