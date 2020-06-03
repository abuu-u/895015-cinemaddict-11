import UserRatingComponent from './components/user-rating';
import {generateFilms} from './mock/film';
import {generateWatchedFilms} from './mock/user-rating';
import {render} from './utils/render';
import PageController from './controllers/page';
import FilmsModel from './models/films';
import FilterController from "./controllers/filter.js";
import SortController from "./controllers/sort.js";

const FILMS_COUNT = 19;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateFilms(FILMS_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

render(siteHeaderElement, new UserRatingComponent(generateWatchedFilms()));

const filterController = new FilterController(siteMainElement, filmsModel);
filterController.render();

const sortController = new SortController(siteMainElement, filmsModel);
sortController.render();

const pageController = new PageController(siteMainElement, filmsModel);

pageController.render();
