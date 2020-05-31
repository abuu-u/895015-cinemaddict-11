import UserRatingComponent from './components/user-rating';
import {generateFilms} from './mock/film';
import {generateWatchedFilms} from './mock/user-rating';
import {render} from './utils/render';
import PageController from './controllers/page';

const FILMS_COUNT = 19;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateFilms(FILMS_COUNT);

render(siteHeaderElement, new UserRatingComponent(generateWatchedFilms()));

const pageController = new PageController(siteMainElement);

pageController.render(films);
