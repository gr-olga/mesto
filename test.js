const arr = [
    {
        title: 'Редактировать профиль',
        inputOne: 'Имя',
        inputTwo: 'О себе'
    },
    {
        title: 'Новое место',
        inputOne: 'Название',
        inputTwo: 'Cсылка на картинку'
    }
]

initialCards.forEach((obj) => renderPopup(obj.title, obj.inputOne, obj.inputTwo));


function renderPopup(title, inputOne, inputTwo) {

    const popupTemplate = document.querySelector('#popup').content;
    const popupElement = popupTemplate.querySelector('.popup').cloneNode(true);
    popupElement.querySelector('.popup__title').textContent = title;
    popupElement.querySelector('.popup__input[name="inputOne"]').textContent = inputOne;
    popupElement.querySelector('.popup__input[name="inputTwo"]').textContent = inputTwo;

}

// const openPopupElement = document.querySelector('.profile__edit-button');
// const openAddPopupElement = document.querySelector('#add_card_popup');
const open = document.querySelector('.popup')
const formElement = document.querySelector('.popup__form');
const inputNameElement = document.querySelector('.popup__input[name="inputOne"]');
const inputSecondNameElement = document.querySelector('.popup__input[name="inputTwo"]');


const openAddPopup = function () {
    open.classList.add('popup_is-open');
    setTimeout(() => {
        open.querySelector('.popup__container').classList.add('popup__container_active');
    }, 4)
}

const closePopup = function () {
    open.classList.remove('popup_is-open')
}

const addCardPopupEl = document.querySelector('.profile__add-card-button');
const editProfileEl = document.querySelector('.profile__edit-button');
const closePopupEl = document.querySelector('.popup__btn-close');

editProfileEl.addEventListener('click', openAddPopup);
addCardPopupEl.addEventListener('click', openAddPopup);
closePopupEl.addEventListener('click', closePopup);

//todo
// нужен if для того чтобы выбрать какой попап отрисовывать в зависимости т того на какой ивент нажато, и отправка формы


function formAddCardSubmitHandler(evt) {
    evt.preventDefault();
    const oneValue = inputNameElement.value
    const twoValue = inputSecondNameElement.value
    const title = "Новое место"
    renderPopup(title, oneValue, twoValue)
    closePopup();
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    const firstValue = inputNameElement.value
    const secondValue = inputSecondNameElement.value
    renderPopup()
    closePopup();
}