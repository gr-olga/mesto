export class Card {
    _link
    _title
    _cardSelector
    _id

    constructor(link, title, likesArr, cardSelector, handleCardClick) {
        this._link = link;
        this._title = title;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likesArr = likesArr;
        // this._updateLikes =
        this._id = id
    }

    _getTemplate() {
        this._cardTemplate = document.querySelector(this._cardSelector).content;
        return this._cardTemplate.querySelector('.card').cloneNode(true)
    }

    generateCard() {
        this._element = this._getTemplate();
        const cardImageElement = this._element.querySelector('.card__image');
        cardImageElement.src = this._link;
        cardImageElement.alt = this._title;
        this._element.querySelector('.card__title').textContent = this._title;
        this._addLikeToggle();
        this._addRemoveListener();
        this._addPopupListener();
        this.likesRender();
        return this._element
    }

    _addLikeToggle() {
        const likeButtonElement = this._element.querySelector('.card__like');
        likeButtonElement.addEventListener('click', () => {
            likeButtonElement.classList.toggle('card__like-active');
            if (likeButtonElement.classList.contains('card__like-active')) {
                this._deleteLikes(id)
            } else {
                this._updateLikes(id);
            }
        });
    }

    _addPopupListener() {
        const cardImage = this._element.querySelector('.card__image');
        cardImage.addEventListener('click', (evt) => {
            this._handleCardClick(this._link, this._title)
        });
    }

    _addRemoveListener() {
        this._element.querySelector('.card__remove').addEventListener('click', (evt) => {
            evt.preventDefault();
            this._element.remove();
            this._element = null;
        });
    }


    likesRender() {
        this._element.querySelector('.card__like-num').textContent = this._likesArr.length;
    }

̵
}
