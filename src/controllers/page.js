import SortComponent, {SortType} from '../components/sort';
import FiltersComponent from '../components/filters';
import FilmController from './film';
import FilmsContainerComponent from '../components/films-container';
import ShowMoreButtonComponent from '../components/show-more-button';
import {render, remove} from '../utils/render';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilms = (filmListElement, films, onDataChange) => {
  return films.map((film) => {
    const filmController = new FilmController(filmListElement, onDataChange);

    filmController.render(film);

    return filmController;
  });
};

const getSortedFilms = (films, sortType) => {
  let sortedTasks = [];
  const showingTasks = films.slice();

  switch (sortType) {
    case SortType.BY_DATE:
      sortedTasks = showingTasks.sort((a, b) => {
        return new Date(b.info.release.date) - new Date(a.info.release.date);
      });
      break;
    case SortType.BY_RATING:
      sortedTasks = showingTasks.sort((a, b) => {
        return b.info.totalRating - a.info.totalRating;
      });
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks;
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._sortedFilms = [];
    this._showedFilmControllers = [];
    this._filtersComponent = null;
    this._sortComponent = new SortComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  render(films) {
    if (!this._films.length) {
      this._films = films;
    }

    this._sortedFilms = films;

    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    let showingFilmsOnStart = this._sortedFilms.slice(0, SHOWING_FILMS_COUNT_ON_START);

    this._filtersComponent = new FiltersComponent(showingFilmsOnStart);
    render(this._container, this._filtersComponent);

    render(this._container, this._sortComponent);

    render(this._container, this._filmsContainerComponent);

    const filmsListContainerElement = this._filmsContainerComponent.getFilmsListContainerElement();
    const filmsListElement = this._filmsContainerComponent.getFilmsListElement();

    let newFilms = renderFilms(filmsListContainerElement, showingFilmsOnStart, this._onDataChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    render(filmsListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      newFilms = renderFilms(filmsListContainerElement, this._sortedFilms.slice(prevTasksCount, showingFilmsCount), this._onDataChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      this._filtersComponent.updateFilters(this._sortedFilms.slice(0, showingFilmsCount));

      if (showingFilmsCount >= this._sortedFilms.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _onSortTypeChange(sortType) {
    remove(this._filtersComponent);
    remove(this._sortComponent);
    remove(this._filmsContainerComponent);
    remove(this._showMoreButtonComponent);
    this._showedFilmControllers = [];
    this.render(getSortedFilms(this._films, sortType));
  }

  _onDataChange(oldData, newData) {
    const index = this._sortedFilms.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._sortedFilms = [].concat(this._sortedFilms.slice(0, index), newData, this._sortedFilms.slice(index + 1));

    this._showedFilmControllers[index].render(this._sortedFilms[index]);
  }
}
