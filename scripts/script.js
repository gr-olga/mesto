// const popupElement = document.querySelector('.popup');
// const openPopupElement = document.querySelector('.profile__edit-button');
// const closePopupElement = document.querySelector('.popup__btn-close');
// const profileNameElement = document.querySelector('.profile__name');
// const profileExtraElement = document.querySelector('.profile__extra');
// const inputNameElement = document.querySelector('.popup__input[name="profileName"]');
// const inputExtraElement = document.querySelector('.popup__input[name="extra"]');
// const formElement = document.querySelector('.popup__form');
//
// const deleteCardElement = document.querySelector('.card__remove');

function renderCard() {
    const cardsGrid = document.querySelector('.cards-grid');
    const cardTemplate = document.querySelector('#card').content;

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = 'images/air6.jpeg';
    cardElement.querySelector('.card__title').textContent = 'xnj-nj';
    cardsGrid.prepend(cardElement);

}

renderCard();

//
// const removeCard = function () {
//     // удалить карточку на которой кликнули
// }
//
// const openPopup = function () {
//     inputNameElement.value = profileNameElement.innerText;
//     inputExtraElement.value = profileExtraElement.innerText;
//     popupElement.classList.add('popup_is-open');
// }
//
// const closePopup = function () {
//     popupElement.classList.remove('popup_is-open')
// }
//
// function formSubmitHandler(evt) {
//     evt.preventDefault();
//     const nameValue = inputNameElement.value
//     const extraValue = inputExtraElement.value
//
//     profileNameElement.textContent = nameValue;
//     profileExtraElement.textContent = extraValue;
//     closePopup();
// }
//
// openPopupElement.addEventListener('click', openPopup);
// closePopupElement.addEventListener('click', closePopup);
// formElement.addEventListener('submit', formSubmitHandler);
//
// deleteCardElement.addEventListener('click', removeCard);