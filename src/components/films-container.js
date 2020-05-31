import AbstractComponent from "./abstract-component";

export default class FilmsContainer extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
      </section>
    </section>`
    );
  }

  getFilmsListElement() {
    return this.getElement().querySelector(`.films-list`);
  }

  getFilmsListContainerElement() {
    return this.getFilmsListElement().querySelector(`.films-list__container`);
  }
}
