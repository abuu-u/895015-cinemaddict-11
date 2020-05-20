
import {createElement} from "../utils";

const createFilmsContainerTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
      </section>
    </section>`
  );
};

export default class FilmsContainer {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._element = null;
  }

  getTemplate() {
    return createFilmsContainerTemplate(this._filmsContainer);
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