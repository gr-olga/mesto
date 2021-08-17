export class UserInfo {
    constructor(info) {
        this._name = info.name;
        this._profile = info.profile;

    }

    getUserInfo() {
        const nameValue = this._name.value;
        const extraValue = this._profile.value
    }

    setUserInfo(el) {
        el.textContent = this._name.value;
        el.textContent = this._profile.value
    }

}