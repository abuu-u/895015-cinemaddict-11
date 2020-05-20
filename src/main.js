import UserRatingComponent from './components/user-rating';
import SortComponent from './components/sort';
import FiltersComponent from './components/filters';
import FilmsContainerComponent from './components/films-container';
import FilmComponent from './components/film';
import ShowMoreButtonComponent from './components/show-more-button';
import FilmDetailsComponent from './components/film-details';
import {generateFilms} from './mock/film';
import {ESC_KEY} from './const';
import {render} from './utils';

const FILMS_COUNT = 19;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const renderFilm = (filmsListContainerElement, film) => {
  const filmComponent = new FilmComponent(film);
  const filmElement = filmComponent.getElement();

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const filmDetailsElement = filmDetailsComponent.getElement();

  const renderFilmDetails = () => {
    document.body.appendChild(filmDetailsElement);
  };

  const removeFilmDetails = () => {
    document.body.removeChild(filmDetailsElement);
  };

  const onFilmDetailsCloseClick = () => {
    removeFilmDetails();
  };

  const onFilmDetailsPressEsc = (evt) => {
    if (document.body.querySelector(`.film-details`)) {
      if (evt.key === ESC_KEY) {
        removeFilmDetails();
      }
    }
  };

  render(filmsListContainerElement, filmElement);

  filmElement.querySelector(`.film-card__title`).addEventListener(`click`, renderFilmDetails);
  filmElement.querySelector(`.film-card__poster`).addEventListener(`click`, renderFilmDetails);
  filmElement.querySelector(`.film-card__comments`).addEventListener(`click`, renderFilmDetails);

  filmDetailsElement.querySelector(`.film-details__close-btn`).addEventListener(`click`, onFilmDetailsCloseClick);
  document.addEventListener(`keydown`, onFilmDetailsPressEsc);
};

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

const updateFilters = (filtersContainer, filterValues) => {
  const {
    watchlist,
    alreadyWatched,
    favorite,
  } = filterValues;

  filtersContainer.querySelector(`a[href='#watchlist'] > span`).textContent = watchlist;
  filtersContainer.querySelector(`a[href='#history'] > span`).textContent = alreadyWatched;
  filtersContainer.querySelector(`a[href='#favorites'] > span`).textContent = favorite;
};

const films = generateFilms(FILMS_COUNT);
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
let showingFilmsOnStart = films.slice(0, SHOWING_FILMS_COUNT_ON_START);

render(siteHeaderElement, new UserRatingComponent().getElement());

const filtersComponent = new FiltersComponent(getFiltersValues(showingFilmsOnStart));
const filtersElement = filtersComponent.getElement();
render(siteMainElement, filtersElement);

render(siteMainElement, new SortComponent().getElement());

const filmsContainerComponent = new FilmsContainerComponent();
const filmsContainerElement = filmsContainerComponent.getElement();
render(siteMainElement, filmsContainerElement);
const filmsListElement = filmsContainerElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

showingFilmsOnStart
  .forEach((film) => renderFilm(filmsListContainerElement, film));

const showMoreButtonComponent = new ShowMoreButtonComponent();
const showMoreButtonElement = showMoreButtonComponent.getElement();
render(filmsListElement, showMoreButtonElement);

showMoreButtonElement.addEventListener(`click`, () => {
  const prevTasksCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevTasksCount, showingFilmsCount)
    .forEach((film) => renderFilm(filmsListContainerElement, film));

  updateFilters(filtersElement, getFiltersValues(films.slice(0, showingFilmsCount)));

  if (showingFilmsCount >= films.length) {
    showMoreButtonElement.remove();
    showMoreButtonComponent.removeElement();
  }
});
