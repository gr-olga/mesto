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

const cardTemplate = document.querySelector('#card').content;
const cardsGrid = document.querySelector('.cards-grid');

initialCards.forEach((item) => {
    const card = new Card(item.link, item.title);
    const cardElement = card.generateCard();
    renderCard(cardElement);
});


class Card {
    _link
    _title

    constructor(link, title) {
        this._link = link;
        this._title = title
    }

    _getTemplate() {
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        return cardElement
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__image').src = link;
        this._element.querySelector('.card__title').textContent = cardTitle;
        this._addLikeToggle();
        return this._element
    }

    _addLikeToggle() {
        const likeButtonElement = cardElem.querySelector('.card__like');
        likeButtonElement.addEventListener('click', (evt) => {
            likeButtonElement.classList.toggle('card__like-active');
        });

    }

    _removeCard() {

    }

    createPopupCard() {

    }

}