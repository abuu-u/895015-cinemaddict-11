import AbstractComponent from "./abstract-component";

const getFiltersValues = (films) => {
  let filterValues = {
    watchlist: 0,
    alreadyWatched: 0,
    favorite: 0,
  };

  films.forEach((film) => {
    for (const [key, value] of Object.entries(film.userDetails)) {
      filterValues[key] += value ? 1 : 0;
    }
  });

  return filterValues;
};

export default class Filters extends AbstractComponent {
  constructor(films) {
    super();

    this._filters = getFiltersValues(films);
  }

  getTemplate() {
    const {
      watchlist,
      alreadyWatched,
      favorite,
    } = this._filters;

    return (
      `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${alreadyWatched}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
    );
  }

  updateFilters(films) {
    const {
      watchlist,
      alreadyWatched,
      favorite,
    } = getFiltersValues(films);

    this.getElement().querySelector(`a[href='#watchlist'] > span`).textContent = watchlist;
    this.getElement().querySelector(`a[href='#history'] > span`).textContent = alreadyWatched;
    this.getElement().querySelector(`a[href='#favorites'] > span`).textContent = favorite;
  }
}
