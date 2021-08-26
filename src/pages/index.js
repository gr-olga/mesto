import './index.css';
import {FormValidator} from "../conponents/FormValidator.js";
import {Card} from "../conponents/Card.js";
import {Section} from "../conponents/Section.js";
import {PopupWithImage} from "../conponents/PopupWithImage";
import {PopupWithForm} from "../conponents/PopupWithForm";
// import {initialCards} from "../utils/data";
import {api} from "../conponents/Api";
import {UserInfo} from "../conponents/UserInfo";
import {PopupAskRemove} from "../conponents/PopupAskRemove";

const openPopupElement = document.querySelector('.profile__edit-button');
const openAddCardPopupElement = document.querySelector('.profile__add-card-button');
const openPopupDeleteCard = document.querySelector('.card__remove');

const formProfile = document.querySelector('.popup__form[name = "profileInfo"]');
const formCardElement = document.querySelector('.popup__form[name = "newPlace"]');

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    infoSelector: '.profile__extra'
})

api.getInitialProfile().then((data) => {
    userInfo.setId(data._id)
    fillProfileData(data);
})

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

const cardGridSelector = '.cards-grid'

function createCard(link, name, likesArr, id, ownerId) {
    const card = new Card(
        link,
        name,
        likesArr,
        id,
        userInfo.getId(),
        ownerId,
        '#card',
        handleCardClick,
        popupRemove,
        (id) => api.updateLikes(id),
        (id) => api.deleteLikes(id));
    return card.generateCard();
}

function renderCards() {
    let cardsList = []
    api.getInitialCards().then((data) => {
        cardsList = data;
        const section = new Section({items: cardsList, renderer: createCard}, cardGridSelector);
        const renderedElements = section.renderAllElements();
        renderedElements.forEach((item) => section.addItem(item));
    })
}

renderCards();

function popupRemove(id) {
    const popupAskRemove = new PopupAskRemove('#small_popup', () => {
        api.deleteCard(id).then(() => {
            popupAskRemove.close();
            renderCards();
        })
    });
    popupAskRemove.setEventListeners();
    popupAskRemove.open();
}

const popupWithImage = new PopupWithImage('.popup_card');
popupWithImage.setEventListeners();

function handleCardClick(link, title) {
    popupWithImage.open(link, title);
}

const popupCardWithForm = new PopupWithForm('#add_card_popup', inputData => submitCardForm(inputData))
openAddCardPopupElement.addEventListener('click', () => {
    cardValidationCardElement.resetValidation();
    cardValidationCardElement.disableButton();
    popupCardWithForm.open();
});
popupCardWithForm.setEventListeners();


function submitCardForm({cardTitle, link}) {
    api.addCard({name: cardTitle, link})
        .then(() => renderCards())
        .then(() => popupCardWithForm.close())
}

const popupProfileWithForm = new PopupWithForm('#edit_profile_popup', (inputData) => submitProfileForm(inputData))
openPopupElement.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    setData(info);
    popupProfileWithForm.open();
    cardValidationProfile.resetValidation();
});
popupProfileWithForm.setEventListeners();


function submitProfileForm(inputData) {
    return api.updateUserProfile({name: inputData.profileName, about: inputData.extra})
        .then((data) => {
            userInfo.setUserInfo({profileName: data.name, extra: data.about});
            popupProfileWithForm.close();
        })
}

function setData({name, info}) {
    const input1 = formProfile.querySelector('.popup__input[name="profileName"]');
    const input2 = formProfile.querySelector('.popup__input[name="extra"]');
    input1.value = name;
    input2.value = info;
}

function fillProfileData({avatar, name, about}) {
    const avatarElement = document.querySelector('.profile__avatar');
    const nameElement = document.querySelector('.profile__name');
    const extraElement = document.querySelector('.profile__extra');
    avatarElement.src = avatar;
    nameElement.textContent = name;
    extraElement.textContent = about;

}


// api.getInitialProfile().then(data => {
//     const userId = data._id;
//     userInfo.setUserInfo({
//         name: data.name,
//         extra: data.about
//     });
//     api.getInitialCards().then(data => {
//         const section = new Section({items: data.map(card =>{
//             card.UserId = UserId
//                 return card
//             }), renderer: createCard}, cardGridSelector);
//         const renderedElements = section.renderAllElements();
//         renderedElements.forEach((item) => section.addItem(item));
//     })
// })



