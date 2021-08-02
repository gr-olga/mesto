export class Card {
    _link
    _title

    constructor(link, title) {
        this._link = link;
        this._title = title
    }

    _getTemplate() {
        const cardTemplate = document.querySelector('#card').content;
        return cardTemplate.querySelector('.card').cloneNode(true)
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__title').textContent = this._title;
        this._addLikeToggle();
        this._removeCard();
        return this._element
    }

    _addLikeToggle() {
        const likeButtonElement = this._element.querySelector('.card__like');
        likeButtonElement.addEventListener('click', (evt) => {
            likeButtonElement.classList.toggle('card__like-active');
        });

    }

    _removeCard() {
        this._element.querySelector('.card__remove').addEventListener('click', (evt) => {
            evt.preventDefault();
            this._element.remove();
        });
    }
}
