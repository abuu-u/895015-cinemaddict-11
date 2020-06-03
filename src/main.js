import UserRatingComponent from './components/user-rating';
import {generateFilms} from './mock/film';
import {generateWatchedFilms} from './mock/user-rating';
import {render} from './utils/render';
import PageController from './controllers/page';
import FilmsModel from './models/films';
import FilterController from "./controllers/filter.js";
import SortController from "./controllers/sort.js";
import StatisticsController from './controllers/statistics';

const FILMS_COUNT = 19;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateFilms(FILMS_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

render(siteHeaderElement, new UserRatingComponent(generateWatchedFilms()));

const statisticsController = new StatisticsController(siteMainElement, filmsModel);

const sortController = new SortController(siteMainElement, filmsModel);

const pageController = new PageController(siteMainElement, filmsModel, statisticsController, sortController);

const filterController = new FilterController(siteMainElement, filmsModel, pageController, statisticsController);

filterController.render();

sortController.render();

statisticsController.render();

pageController.render();
