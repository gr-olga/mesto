const editProfilePopupElement = document.querySelector('#edit_profile_popup');

const openPopupElement = document.querySelector('.profile__edit-button');
const editPopupCloseButtonElement = editProfilePopupElement.querySelector('.popup__btn-close');
const profileNameElement = document.querySelector('.profile__name');
const profileExtraElement = document.querySelector('.profile__extra');
const inputNameElement = document.querySelector('.popup__input[name="profileName"]');
const inputExtraElement = document.querySelector('.popup__input[name="extra"]');
const formElement = document.querySelector('.popup__form[name = "profileInfo"]');
const openAddCardPopupElement = document.querySelector('.profile__add-card-button');
const formCardElement = document.querySelector('.popup__form[name = "newPlace"]');
const deleteCardElement = document.querySelector('.card__remove');


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


initialCards.forEach(function (obj) {
    // console.log(obj.name, obj.link)
    renderCard(obj.name, obj.link)
});


function renderCard(cardTitle, link) {
    const cardsGrid = document.querySelector('.cards-grid');
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardsGrid.prepend(cardElement);
}


// const removeCard = function (target) {
//     cardsGrid.remove(cardElement);
// }

const openPopup = function () {
    inputNameElement.value = profileNameElement.innerText;
    inputExtraElement.value = profileExtraElement.innerText;
    editProfilePopupElement.classList.add('popup_is-open');
}

const closePopup = function (evt) {
    evt.stopPropagation();
    editProfilePopupElement.classList.remove('popup_is-open')
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    const nameValue = inputNameElement.value
    const extraValue = inputExtraElement.value

    profileNameElement.textContent = nameValue;
    profileExtraElement.textContent = extraValue;
    closePopup();
}

const addCardPopupElement = document.querySelector('#add_card_popup');
const addPopupCloseButtonElement = addCardPopupElement.querySelector('.popup__btn-close');
const cardTitleElement = document.querySelector('.card__title');
const cardLinkElement = document.querySelector('.card__image');
const inputCardTitleElement = document.querySelector('.popup__input[name="cardTitle"]');
const inputCardLinkElement = document.querySelector('.popup__input[name="link"]');


const openAddCardPopup = function () {
    addCardPopupElement.classList.add('popup_is-open');
}

const closeAddCardPopup = function () {
    addCardPopupElement.classList.remove('popup_is-open')
}

function formCardSubmitHandler(evt) {
    evt.preventDefault();
    const titleValue = inputCardTitleElement.value
    const linkValue = inputCardLinkElement.value

    renderCard(titleValue, linkValue)
    closeAddCardPopup();
}

openAddCardPopupElement.addEventListener('click', openAddCardPopup);
addPopupCloseButtonElement.addEventListener('click', closeAddCardPopup);
formCardElement.addEventListener('submit', formCardSubmitHandler);

openPopupElement.addEventListener('click', openPopup);
editPopupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);


const likeButtonElement = document.querySelector('.card__like');

likeButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    likeButtonElement.classList.add('card__like-active');
});
