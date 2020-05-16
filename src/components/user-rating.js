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
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getUserRating(generateWatchedFilms())}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createUserRatingTemplate};
