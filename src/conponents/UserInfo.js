export class UserInfo {
    constructor({nameSelector, infoSelector, infoInputSelector, nameInputSelector}) {
        this._profileNameElement = document.querySelector(nameSelector);
        this._profileExtraElement = document.querySelector(infoSelector);
        this._nameInputEl = document.querySelector(nameInputSelector);
        this._infoInputEl = document.querySelector(infoInputSelector);
    }

    getUserInfo() {
        return {
            name: this._profileNameElement.textContent,
            info: this._profileExtraElement.textContent
        }
    }

    updateFormUserInfo({name, info}) {
        this._nameInputEl.value = name;
        this._infoInputEl.value = info;
    }

    setUserInfo({profileName, extra}) {
        this._profileNameElement.textContent = profileName;
        this._profileExtraElement.textContent = extra;
    }

}