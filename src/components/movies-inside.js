import {createElement} from "../utils";

export default class MoviesInside {
  constructor(moviesInside) {
    this._moviesInside = moviesInside;

    this._element = null;
  }

  getTemplate() {
    return `<p>${this._moviesInside} movies inside</p>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
