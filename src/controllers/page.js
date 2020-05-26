import SortComponent from '../components/sort';
import FiltersComponent from '../components/filters';
import FilmsContainerComponent from '../components/films-container';
import FilmComponent from '../components/film';
import ShowMoreButtonComponent from '../components/show-more-button';
import FilmDetailsComponent from '../components/film-details';
import {ESC_KEY} from '../const';
import {render, remove} from '../utils/render';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const renderFilm = (filmsListContainerElement, film) => {
  const filmComponent = new FilmComponent(film);

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const filmDetailsElement = filmDetailsComponent.getElement();

  const renderFilmDetails = () => {
    document.body.appendChild(filmDetailsElement);
    document.addEventListener(`keydown`, onFilmDetailsPressEsc);
  };

  const removeFilmDetails = () => {
    document.body.removeChild(filmDetailsElement);
    document.removeEventListener(`keydown`, onFilmDetailsPressEsc);
  };

  const onFilmDetailsCloseClick = () => {
    removeFilmDetails();
  };

  const onFilmDetailsPressEsc = (evt) => {
    if (evt.key === ESC_KEY) {
      removeFilmDetails();
    }
  };

  render(filmsListContainerElement, filmComponent);

  filmComponent.setTitleClickHandler(renderFilmDetails);
  filmComponent.setPosterClickHandler(renderFilmDetails);
  filmComponent.setCommentsClickHandler(renderFilmDetails);

  filmDetailsComponent.setCloseClickHandler(onFilmDetailsCloseClick);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    const container = this._container;
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    let showingFilmsOnStart = films.slice(0, SHOWING_FILMS_COUNT_ON_START);

    const filtersComponent = new FiltersComponent(showingFilmsOnStart);
    render(container, filtersComponent);

    render(container, this._sortComponent);

    render(container, this._filmsContainerComponent);
    const filmsListElement = this._filmsContainerComponent.getElement().querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

    showingFilmsOnStart
      .forEach((film) => renderFilm(filmsListContainerElement, film));

    render(filmsListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      films.slice(prevTasksCount, showingFilmsCount)
        .forEach((film) => renderFilm(filmsListContainerElement, film));

      filtersComponent.updateFilters(films.slice(0, showingFilmsCount));

      if (showingFilmsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }
}
