import {getFilmsByFilter} from "../utils/filter.js";
import {getSortedFilms} from "../utils/sort.js";
import {FilterType} from "../const.js";
import {SortType} from "../const.js";

export default class Films {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;
    this._activeSortType = SortType.DEFAULT;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._sortChangeHandlers = [];
  }

  getFilms() {
    return getSortedFilms(getFilmsByFilter(this._films, this._activeFilterType), this._activeSortType);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setSort(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortChangeHandlers);

  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  removeComment(filmId, commentId) {
    const filmIndex = this._films.findIndex((it) => it.id === filmId);
    const commentIndex = this._films[filmIndex].comments.findIndex((it) => it.id === commentId);

    if (filmIndex === -1 && commentIndex === -1) {
      return false;
    }

    this._films[filmIndex].comments.splice(commentIndex, 1);

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addComment(filmId, comment) {
    const filmIndex = this._films.findIndex((it) => it.id === filmId);

    if (filmIndex === -1) {
      return false;
    }

    this._films[filmIndex].comments.push(comment);

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
