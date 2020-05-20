import {createElement} from "../utils";

const USER_RATINGS = [
  `novice`,
  `fan`,
  `movie buff`,
];

const getUserRating = (watchedFilms) => {
  return watchedFilms ? USER_RATINGS[Math.floor(watchedFilms / 10)] : ``;
};

export default class UserRating {
  constructor(watchedFilms) {
    this._watchedFilms = watchedFilms;

    this._element = null;
  }

  getTemplate() {
    const rating = getUserRating(this._watchedFilms);

    return (
      `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
    );
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
