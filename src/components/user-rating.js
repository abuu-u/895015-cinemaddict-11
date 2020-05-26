import AbstractComponent from "./abstract-component";

const USER_RATINGS = [
  `novice`,
  `fan`,
  `movie buff`,
];

export default class UserRating extends AbstractComponent {
  constructor(watchedFilms) {
    super();

    this._watchedFilms = watchedFilms;
  }

  getUserRating() {
    return this._watchedFilms ? USER_RATINGS[Math.floor(this._watchedFilms / 10)] : ``;
  }

  getTemplate() {
    const rating = this.getUserRating();

    return (
      `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
    );
  }
}
