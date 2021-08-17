import '../styles/index.css';
import {FormValidator} from "../scripts/FormValidator.js";
import {Card} from "../scripts/Card.js";
import {Section} from "../scripts/Section.js";
import {PopupWithImage} from "../scripts/PopupWithImage";
import {PopupWithForm} from "../scripts/PopupWithForm";
import {UserInfo} from "../scripts/UserInfo";
import {Popup} from "../scripts/Popup";
import {assertConfigApplicableTest} from "@babel/core/lib/config/validation/option-assertions";
//
// const editProfilePopupElement = document.querySelector('#edit_profile_popup');
// const addCardPopupElement = document.querySelector('#add_card_popup');

const openPopupElement = document.querySelector('.profile__edit-button');
const openAddCardPopupElement = document.querySelector('.profile__add-card-button');

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
    popupWithImage.setEventListeners();
}

const popupCardWithForm = new PopupWithForm('#add_card_popup', (evt) => submitCardForm(evt))
openAddCardPopupElement.addEventListener('click', openEditPopupWithForm);

function openEditPopupWithForm() {
    popupCardWithForm.open();
    popupCardWithForm.setEventListeners();
}

function submitCardForm(evt) {
    evt.preventDefault();
    const titleValue = inputCardTitleElement.value
    const linkValue = inputCardLinkElement.value
    const cardElement = createCard(linkValue, titleValue, handleCardClick);
    section.addItem(cardElement);
    popupCardWithForm.close();
}

const popupProfileWithForm = new PopupWithForm('#edit_profile_popup', (evt) => submitProfileForm(evt))
openPopupElement.addEventListener('click', openCardPopupWithForm);

function openCardPopupWithForm() {
    popupProfileWithForm.open();
    popupProfileWithForm.setEventListeners();
}

const userInfo = new UserInfo({
    nameSelector: '.popup__input[name="profileName"]',
    infoSelector: '.popup__input[name="extra"]'
})

function submitProfileForm(evt) {
    evt.preventDefault();
    const info = userInfo.getUserInfo();
    userInfo.setUserInfo(info);
    popupProfileWithForm.close();
}








