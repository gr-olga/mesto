export class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._containerElement = document.querySelector(this._containerSelector);
    }

    renderAllElements() {
        const elements = []
        this._items.forEach((item) => {
            const el = this._renderer(item.link, item.name);
            elements.push(el)
        })
        return elements;
    }

    addItem(el) {
        this._containerElement.prepend(el);
    }
}