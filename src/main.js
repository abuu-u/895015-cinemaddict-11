import {createUserRatingTemplate} from './components/user-rating';
import {createFilmTemplate} from './components/film';
import {createExtraFilms} from './components/extra-films';
import {createMenuTemplate} from './components/menu';
import {createShowMoreButtonTemplate} from './components/show-more-button';

const FILM_COUNT = 5;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderExtraFilms = (type, count) => {
  const extraFilms = [];

  for (let i = 0; i < count; i++) {
    extraFilms.push(createFilmTemplate());
  }

  render(films, createExtraFilms(type, extraFilms));
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createUserRatingTemplate());
render(siteMainElement, createMenuTemplate());

const films = siteMainElement.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsContainer, createFilmTemplate());
}

render(filmsList, createShowMoreButtonTemplate());

renderExtraFilms(`Top rated`, TOP_RATED_FILM_COUNT);
renderExtraFilms(`Most commented`, MOST_COMMENTED_FILM_COUNT);
