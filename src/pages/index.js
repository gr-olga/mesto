import './index.css';
import {FormValidator} from "../conponents/FormValidator.js";
import {Card} from "../conponents/Card.js";
import {Section} from "../conponents/Section.js";
import {PopupWithImage} from "../conponents/PopupWithImage";
import {PopupWithForm} from "../conponents/PopupWithForm";
import {api} from "../conponents/Api";
import {UserInfo} from "../conponents/UserInfo";
import {PopupAskRemove} from "../conponents/PopupAskRemove";

const openAvatarPopupElement = document.querySelector('.profile__avatar-container');
const openPopupElement = document.querySelector('.profile__edit-button');
const openAddCardPopupElement = document.querySelector('.profile__add-card-button');
const openPopupDeleteCard = document.querySelector('.card__remove');

const formProfile = document.querySelector('.popup__form[name = "profileInfo"]');
const formCardElement = document.querySelector('.popup__form[name = "newPlace"]');
const formAvatarElement = document.querySelector('.popup__form[name = "avatarForm"]');

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    infoSelector: '.profile__extra',
    avatarSelector: '.profile__avatar'
})

// api.getInitialProfile().then((data) => {
//     userInfo.setId(data._id)
//     fillProfileData(data);
// })

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
const cardValidationAvatarElement = new FormValidator(config, formAvatarElement)
cardValidationProfile.enableValidation()
cardValidationCardElement.enableValidation()
cardValidationAvatarElement.enableValidation()

const cardGridSelector = '.cards-grid'

function createCard(item) {
    const card = new Card(
        item.link,
        item.name,
        item.likes,
        item._id,
        userInfo.getId(),
        item.owner._id,
        '#card',
        handleCardClick,
        popupRemove,
        (id) => api.updateLikes(item._id),
        (id) => api.deleteLikes(item._id));
    return card.generateCard();
}

let section = null;

function renderCards() {
    Promise.all([
        api.getInitialProfile(),
        api.getInitialCards(),
    ])
        .then(([profile, cardsList]) => {
            userInfo.setId(profile._id)
            fillProfileData({avatar: profile.avatar, name: profile.name, about: profile.about});
            section = new Section({items: cardsList, renderer: createCard}, cardGridSelector);
            const renderedElements = section.renderAllElements();
            renderedElements.forEach((item) => section.addItem(item));
        })
        .catch((err) => {
            // попадаем сюда, если один из промисов завершится ошибкой
            console.log(err);
        });
    // api.getInitialCards().then((data) => {
}

renderCards();

function popupRemove(id, element) {
    const popupAskRemove = new PopupAskRemove('#small_popup', () => {
        api.deleteCard(id).then(() => {
            popupAskRemove.close();
            element.remove();
        })
    });
    popupAskRemove.setEventListeners();
    popupAskRemove.open(id, popupAskRemove);
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
    popupCardWithForm.renderLoading(true)
    api.addCard({name: cardTitle, link})
        .then((res) => res.json())
        .then((item) => section.addItem(createCard(item)))
        .then(() => popupCardWithForm.close())
        .finally(() => {
            popupCardWithForm.renderLoading(false)
        })
}

const popupProfileWithForm = new PopupWithForm('#edit_profile_popup', (inputData) => submitProfileForm(inputData))
openPopupElement.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    setData(info);
    popupProfileWithForm.open();
    cardValidationProfile.resetValidation();
    cardValidationProfile.disableButton();
});
popupProfileWithForm.setEventListeners();

const popupAvatarWithForm = new PopupWithForm('#avatar_form', (avatar) => SubmitProfileAvatar(avatar))
openAvatarPopupElement.addEventListener('click', () => {
    popupAvatarWithForm.open();
    cardValidationAvatarElement.resetValidation();
    cardValidationAvatarElement.disableButton()
});
popupAvatarWithForm.setEventListeners();


function submitProfileForm(inputData) {
    popupProfileWithForm.renderLoading(true)
    return api.updateUserProfile({name: inputData.profileName, about: inputData.extra})
        .then((data) => {
            userInfo.setUserInfo({profileName: data.name, extra: data.about});
        })
        .finally(() => {
            popupProfileWithForm.renderLoading(false)
            popupProfileWithForm.close()
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

function SubmitProfileAvatar(avatar) {
    popupAvatarWithForm.renderLoading(true)
    return api.updateProfileAvatar(avatar.link).then((data) => {
        userInfo.setUserAvatar(data.avatar)
    })
        .finally(() => {
            popupAvatarWithForm.renderLoading(false)
            popupAvatarWithForm.close()
        })
}




