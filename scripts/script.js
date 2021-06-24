const popupElement = document.querySelector('.popup');
const openPopupElement = document.querySelector('.profile__edit-button');
const closePopupElement = document.querySelector('.popup__btn-close');
const profileNameElement = document.querySelector('.profile__name');
const profileExtraElement = document.querySelector('.profile__extra');
const inputNameElement = document.querySelector('.popup__input[name="profileName"]');
const inputExtraElement = document.querySelector('.popup__input[name="extra"]');
const formElement = document.querySelector('.popup__form');

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
    console.log(obj.name, obj.link)
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


const removeCard = function () {
    // удалить карточку на которой кликнули
}

const openPopup = function () {
    inputNameElement.value = profileNameElement.innerText;
    inputExtraElement.value = profileExtraElement.innerText;
    popupElement.classList.add('popup_is-open');
}

const closePopup = function () {
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

deleteCardElement.addEventListener('click', removeCard);