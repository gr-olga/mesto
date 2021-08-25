export class UserInfo {
    constructor({nameSelector, infoSelector, infoInputSelector, nameInputSelector}) {
        this._profileNameElement = document.querySelector(nameSelector);
        this._profileExtraElement = document.querySelector(infoSelector);
    }

    getUserInfo() {
        return {
            name: this._profileNameElement.textContent,
            info: this._profileExtraElement.textContent
        }
    }

    setId(id) {
        this._id = id;
    }

    getId(id) {
        return this._id
    }

    setUserInfo({profileName, extra}) {
        this._profileNameElement.textContent = profileName;
        this._profileExtraElement.textContent = extra;
    }

}