import FilmController from './film';
import FilmsContainerComponent from '../components/films-container';
import ShowMoreButtonComponent from '../components/show-more-button';
import {render, remove} from '../utils/render';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

export default class PageController {
  constructor(container, filmsModel, statisticsController, sortController) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._showedFilmControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._statisticsController = statisticsController;
    this._sortController = sortController;
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
    this._filmsModel.setSortChangeHandler(this._onSortChange);
  }

  hide() {
    this._filmsContainerComponent.hide();
    this._filmsContainerComponent.hide();
    this._sortController.hide();
  }

  show() {
    this._filmsContainerComponent.show();
    this._filmsContainerComponent.show();
    this._sortController.show();
  }

  render() {
    const films = this._filmsModel.getFilms();
    const showingFilmsOnStart = films.slice(0, SHOWING_FILMS_COUNT_ON_START);

    render(this._container, this._filmsContainerComponent);

    this._renderFilms(showingFilmsOnStart);
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _renderFilms(films) {
    const container = this._filmsContainerComponent.getFilmsListContainerElement();

    const newFilms = films.map((film) => {
      const filmController = new FilmController(container, this._onDataChange, this._onViewChange, this._filmsModel);

      filmController.render(film);

      return filmController;
    });

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmsCount = this._showedFilmControllers.length;
    this._renderShowMoreButton();
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    const films = this._filmsModel.getFilms();

    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= films.length) {
      return;
    }

    render(this._filmsContainerComponent.getFilmsListElement(), this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const films = this._filmsModel.getFilms();

    const prevFilmsCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    this._renderFilms(films.slice(prevFilmsCount, this._showingFilmsCount));

    if (this._showingFilmsCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onDataChange(filmController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      filmController.render(newData);
      this._statisticsController.render();
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateFilms(SHOWING_FILMS_COUNT_ON_START);
  }

  _onSortChange() {
    this._updateFilms(SHOWING_FILMS_COUNT_ON_START);
  }
}
