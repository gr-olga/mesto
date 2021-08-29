const token = '0f33f4c7-0e3e-4427-807e-866f8ecb2bfc'
const handleResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
}
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
            .then(handleResponse);
    }

    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-27/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
    }

    getInitialProfile() {
        return fetch('https://nomoreparties.co/v1/cohort-27/users/me', {
            headers: {
                authorization: this._token
            }
        })
            .then(handleResponse);
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
            .then(handleResponse);
    }

    updateProfileAvatar(avatar) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-27/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        })
            .then(handleResponse);
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
