export class Card {
    _link
    _title
    _cardSelector
    _id

    constructor(link, title, likesArr, id, profileId, ownerId, cardSelector, handleCardClick, popupRemove, updateLikes, deleteLikes) {
        this._link = link;
        this._title = title;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likesArr = likesArr;
        this._updateLikes = updateLikes;
        this._deleteLikes = deleteLikes;
        this._id = id;
        this._profileId = profileId;
        this._ownerId = ownerId;
        this._popupRemove = popupRemove;
        // this._likeButtonElement = this._element.querySelector('.card__like');
        // this._deleteBtn = this._element.querySelector('.card__remove')
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
        this._likeButtonElement = this._element.querySelector('.card__like');
        this._checkLikeState()
        this._addLikeToggle();
        this._deleteBtn = this._element.querySelector('.card__remove')
        this.deleteButton()
        this._addPopupListener();
        this.likesRender();
        return this._element
    }

    _addLikeToggle() {
        this._likeButtonElement.addEventListener('click', () => {
            this._setLikeState(this.voteCheck()).then((res) => {
                return res.json().then((data) => {
                    this._likesArr = data.likes;
                    this.likesRender();
                })
            });
        });
    }

    voteCheck() {
        return !!this._likesArr.find((like) => like._id === this._profileId);
    }

    ownerCheck() {
        return this._ownerId === this._profileId;
    }

    deleteButton() {
        if (this.ownerCheck()) {
            this._addRemoveListener();
            this._deleteBtn.classList.add('card__remove_active');
        }
    }

    _setLikeState(isActive) {
        if (!isActive) {
            this._likeButtonElement.classList.add('card__like-active')
            return this._updateLikes(this._id);
        } else {
            this._likeButtonElement.classList.remove('card__like-active')
            return this._deleteLikes(this._id)
        }
    }

    _checkLikeState() {
        if (this.voteCheck()) {
            this._likeButtonElement.classList.add('card__like-active')
        } else {
            this._likeButtonElement.classList.remove('card__like-active')
        }
    }


    _addPopupListener() {
        const cardImage = this._element.querySelector('.card__image');
        cardImage.addEventListener('click', (evt) => {
            this._handleCardClick(this._link, this._title)
        });
    }

    _addRemoveListener() {
        this._deleteBtn.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._popupRemove(this._id);
        })
    }

    likesRender() {
        this._element.querySelector('.card__like-num').textContent = this._likesArr.length;
    }
}
