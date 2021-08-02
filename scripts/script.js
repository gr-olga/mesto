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

const itemPopup = document.querySelector('#show_card')

function createPopupCard(cardElem) {
    const cardLinkElement = cardElem.querySelector('.card__image');
    cardLinkElement.addEventListener('click', function (evt) {
        evt.preventDefault();
        const image = evt.target.src
        const cardItem = cardLinkElement.closest('.card');
        const titleText = cardItem.querySelector('.card__title');
        openPopup(itemPopup);
        itemPopup.querySelector('.popup__img').src = image;
        itemPopup.querySelector('.popup__image-title').textContent = titleText.textContent;
    });
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
}

function submitCardForm(evt) {
    evt.preventDefault();
    const titleValue = inputCardTitleElement.value
    const linkValue = inputCardLinkElement.value
    const card = new Card(linkValue, titleValue);
    const cardElement = card.generateCard();
    createPopupCard(cardElement);
    renderCard(cardElement);
    closePopup(addCardPopupElement);
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



