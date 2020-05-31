import AbstractComponent from "./abstract-component.js";

export default class AbstractSmartComponent extends AbstractComponent {
  constructor() {
    super();

    this._listeners = [];
  }

  recoveryListeners() {
    const listeners = this._listeners.slice();

    while (listeners.length) {
      this._listeners.shift();
      listeners.shift()();
    }
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }

  setHandler(selector, type, handler) {
    this.getElement().querySelector(selector).addEventListener(type, handler);

    this._listeners.push(() => this.setHandler(selector, type, handler));
  }
}
