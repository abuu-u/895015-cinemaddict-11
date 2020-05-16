import {createUserRatingTemplate} from './components/user-rating';
import {createMenuTemplate} from './components/menu';
import {createFilmTemplate} from './components/film';
import {createShowMoreButtonTemplate} from './components/show-more-button';
import {createFilmDetailsTemplate} from './components/film-details';
import {generateFilms} from './mock/film';
import {ESC_KEY} from './const';
import {render} from './utils';

const FILMS_COUNT = 19;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const removeFilmDetails = () => {
  const filmDetails = document.body.querySelector(`.film-details`);

  filmDetails.remove();
  filmDetails.removeEventListener(`click`, onFilmDetailsCloseClick);
  document.removeEventListener(`keydown`, onFilmDetailsPressEsc);
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

const getFilterValues = (films) => {
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

const updateFilters = (filterValues) => {
  const {
    watchlist,
    alreadyWatched,
    favorite,
  } = filterValues;

  siteMainElement.querySelector(`a[href='#watchlist'] > span`).textContent = watchlist;
  siteMainElement.querySelector(`a[href='#history'] > span`).textContent = alreadyWatched;
  siteMainElement.querySelector(`a[href='#favorites'] > span`).textContent = favorite;
};

const films = generateFilms(FILMS_COUNT);
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
let showingFilmsOnStart = films.slice(0, SHOWING_FILMS_COUNT_ON_START);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserRatingTemplate());

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMenuTemplate(getFilterValues(showingFilmsOnStart)));

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

showingFilmsOnStart
  .forEach((film) => render(filmsContainerElement, createFilmTemplate(film), `beforeend`));

render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevTasksCount, showingFilmsCount)
    .forEach((film) => render(filmsContainerElement, createFilmTemplate(film), `beforeend`));

  updateFilters(getFilterValues(films.slice(0, showingFilmsCount)));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);

const filmDetailsCloseElement = document.body.querySelector(`.film-details__close-btn`);
filmDetailsCloseElement.addEventListener(`click`, onFilmDetailsCloseClick);
document.addEventListener(`keydown`, onFilmDetailsPressEsc);
