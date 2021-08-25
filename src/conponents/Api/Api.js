const token = '0f33f4c7-0e3e-4427-807e-866f8ecb2bfc'

class Api {
    constructor(options) {
        // тело конструктора
    }

    _token = token;

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-27/cards', {
            headers: {
                authorization: this._token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getInitialProfile() {
        return fetch('https://nomoreparties.co/v1/cohort-27/users/me', {
            headers: {
                authorization: this._token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    updateUserProfile(inputData) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-27/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    addCard(inputData) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-27/cards', {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        })
    }

    updateLikes(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-27/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {likes: ''}
            )
        })
    }

    deleteLikes(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-27/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
    }

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});