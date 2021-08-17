export class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._nameSelector = nameSelector;
        this._infoSelector = infoSelector;
        this._nameElement = document.querySelector(this._nameSelector);
        this._infoElement = document.querySelector(this._infoSelector);
        this._profileNameElement = document.querySelector('.profile__name');
        this._profileExtraElement = document.querySelector('.profile__extra');

    }

    getUserInfo() {
        return {
            name: this._nameElement.value,
            info: this._infoElement.value
        }
    }

    setUserInfo({name, info}) {
        this._profileNameElement.textContent = name;
        this._profileExtraElement.textContent = info;
    }

}