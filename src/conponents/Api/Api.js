class Api {
    constructor(options) {
        // тело конструктора
    }


    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-27/cards', {
            headers: {
                authorization: '0f33f4c7-0e3e-4427-807e-866f8ecb2bfc'
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
                authorization: '0f33f4c7-0e3e-4427-807e-866f8ecb2bfc'
            }
        })
            .then(res => {
                console.log(res);
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    // другие методы работы с API
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: '0f33f4c7-0e3e-4427-807e-866f8ecb2bfc',
        'Content-Type': 'application/json'
    }
});