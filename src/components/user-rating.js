import {createElement} from "../utils";
import {generateWatchedFilms} from "../mock/user-rating";

const USER_RATINGS = [
  `novice`,
  `fan`,
  `movie buff`,
];

const getUserRating = (watchedFilms) => {
  return watchedFilms ? USER_RATINGS[Math.floor(watchedFilms / 10)] : ``;
};

const createUserRatingTemplate = () => {
  const rating = getUserRating(generateWatchedFilms());

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRating {
  constructor(userRating) {
    this._userRating = userRating;

    this._element = null;
  }

  getTemplate() {
    return createUserRatingTemplate(this._userRating);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
