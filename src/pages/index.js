import './index.css';
import {FormValidator} from "../conponents/FormValidator.js";
import {Card} from "../conponents/Card.js";
import {Section} from "../conponents/Section.js";
import {PopupWithImage} from "../conponents/PopupWithImage";
import {PopupWithForm} from "../conponents/PopupWithForm";
import {UserInfo} from "../conponents/UserInfo";
import {initialCards} from "../utils/data";

const openPopupElement = document.querySelector('.profile__edit-button');
const openAddCardPopupElement = document.querySelector('.profile__add-card-button');

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
//TODO enable validation!!!!!!!!!!!!!!
// cardValidationProfile.enableValidation()
// cardValidationCardElement.enableValidation()

const cardGridSelector = '.cards-grid'

function createCard(link, name) {
    const card = new Card(link, name, '#card', handleCardClick);
    return card.generateCard();
}

const section = new Section({items: initialCards, renderer: createCard}, cardGridSelector);
const renderedElements = section.renderAllElements();
renderedElements.forEach((item) => section.addItem(item));

const popupWithImage = new PopupWithImage('.popup_card');
popupWithImage.setEventListeners();

function handleCardClick(link, title) {
    popupWithImage.open(link, title);
}

const popupCardWithForm = new PopupWithForm('#add_card_popup', inputData => submitCardForm(inputData))
openAddCardPopupElement.addEventListener('click', () => {
    popupCardWithForm.open();
    cardValidationCardElement.resetValidation();
});
popupCardWithForm.setEventListeners();


function submitCardForm({cardTitle, link}) {
    const cardElement = createCard(link, cardTitle, handleCardClick);
    section.addItem(cardElement);
    popupCardWithForm.close();
}

const popupProfileWithForm = new PopupWithForm('#edit_profile_popup', (inputData) => submitProfileForm(inputData))
openPopupElement.addEventListener('click', () => {
    popupProfileWithForm.open();
    cardValidationProfile.resetValidation();
});
popupProfileWithForm.setEventListeners();


const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    infoSelector: '.profile__extra'
})

function submitProfileForm(inputData) {
    userInfo.setUserInfo(inputData);
    popupProfileWithForm.close();
}








