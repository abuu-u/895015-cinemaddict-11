import {createElement} from "../utils";

const createMoviesInsideTemplate = (moviesInside) => {
  return `<p>${moviesInside} movies inside</p>`;
};

export default class MoviesInside {
  constructor(moviesInside) {
    this._moviesInside = moviesInside;

    this._element = null;
  }

  getTemplate() {
    return createMoviesInsideTemplate(this._moviesInside);
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
