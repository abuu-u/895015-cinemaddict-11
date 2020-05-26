import AbstractComponent from "./abstract-component";

export default class MoviesInside extends AbstractComponent {
  constructor(moviesInside) {
    super();

    this._moviesInside = moviesInside;
  }

  getTemplate() {
    return `<p>${this._moviesInside} movies inside</p>`;
  }
}
