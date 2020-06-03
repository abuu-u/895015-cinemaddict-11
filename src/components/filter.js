import AbstractComponent from "./abstract-component";

const FilterText = {
  watchlist: `Watchlist`,
  history: `History`,
  favorites: `Favorites`,
};

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${this._filters.map((filter) => {
        return (
          `<a href="#${filter.name}" data-name="${filter.name}" class="main-navigation__item
          ${filter.checked ? `main-navigation__item--active` : ``}">
          ${filter.name === `all` ? `All movies` : `${FilterText[filter.name]} <span class="main-navigation__item-count">${filter.count}</span>`}
          </a>`
        );
      }).join(`\n`)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
    );
  }

  setFilterChangeHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        handler(evt.target.dataset.name);
      }
    });
  }
}
