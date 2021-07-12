const editProfilePopupElement = document.querySelector('#edit_profile_popup');
const openPopupElement = document.querySelector('.profile__edit-button');
const openAddCardPopupElement = document.querySelector('.profile__add-card-button');
const editPopupCloseButtonElement = editProfilePopupElement.querySelector('.popup__btn-close');
const profileNameElement = document.querySelector('.profile__name');
const profileExtraElement = document.querySelector('.profile__extra');
const inputNameElement = document.querySelector('.popup__input[name="profileName"]');
const inputExtraElement = document.querySelector('.popup__input[name="extra"]');
const formElement = document.querySelector('.popup__form[name = "profileInfo"]');
const formCardElement = document.querySelector('.popup__form[name = "newPlace"]');
const addCardPopupElement = document.querySelector('#add_card_popup');
const addPopupCloseButtonElement = addCardPopupElement.querySelector('.popup__btn-close');
const inputCardTitleElement = document.querySelector('.popup__input[name="cardTitle"]');
const inputCardLinkElement = document.querySelector('.popup__input[name="link"]');
const escapeButtonCode = 27;

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


initialCards.forEach((obj) => {
    const newCardElem = createCard(obj.name, obj.link);
    renderCard(newCardElem);
});


function createCard(cardTitle, link) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    addLikeToggle(cardElement);
    removeCard(cardElement);
    createPopupCard(cardElement);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = cardTitle;
    return cardElement
}

function renderCard(cardElement) {
    const cardsGrid = document.querySelector('.cards-grid');
    cardsGrid.prepend(cardElement);
}

function addLikeToggle(cardElem) {
    const likeButtonElement = cardElem.querySelector('.card__like');
    likeButtonElement.addEventListener('click', (evt) => {
        likeButtonElement.classList.add('card__like-active');
    });
}

function removeCard(cardElem) {
    const deleteCardElement = cardElem.querySelector('.card__remove');
    deleteCardElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        const cardItem = cardElem.closest('.card');
        cardItem.remove();
    });
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
    el.classList.add('popup_is-open')
}

function closePopup(el) {
    el.classList.remove('popup_is-open')
}

const openEditPopup = function () {
    inputNameElement.value = profileNameElement.innerText;
    inputExtraElement.value = profileExtraElement.innerText;
    openPopup(editProfilePopupElement);
}

function formSubmitHandler(evt) {
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

function formCardSubmitHandler(evt) {
    evt.preventDefault();
    const titleValue = inputCardTitleElement.value
    const linkValue = inputCardLinkElement.value
    const newCardElem = createCard(titleValue, linkValue);
    renderCard(newCardElem);
    closePopup(addCardPopupElement);
}


openAddCardPopupElement.addEventListener('click', openAddCardPopup);
addPopupCloseButtonElement.addEventListener('click', () => closePopup(addCardPopupElement))
formCardElement.addEventListener('submit', formCardSubmitHandler);


openPopupElement.addEventListener('click', openEditPopup);
editPopupCloseButtonElement.addEventListener('click', () => closePopup(editProfilePopupElement));
formElement.addEventListener('submit', formSubmitHandler);


const popupElementList = document.querySelectorAll('.popup')
popupElementList.forEach((popup) => {
    popup.addEventListener('click', (evt) => closePopup(evt.target));
    closePopupOnKeyCode(popup, escapeButtonCode)
})


function closePopupOnKeyCode(popup, keyCode) {
    document.addEventListener('keydown', (evt) => {
        if (evt.keyCode === keyCode) closePopup(popup)
    })
}


