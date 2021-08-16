class UserInfo {
    constructor(info) {
        this._name = info.name;
        this._profile = info.profile;

    }

    getUserInfo() {
        const nameValue = this._name.value;
        const extraValue = this._profile.value
    }

    setUserInfo(el) {
        el.textContent = nameValue;
        el.textContent = extraValue;
    }

}