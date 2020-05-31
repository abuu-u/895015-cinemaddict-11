import AbstractSmartComponent from "./abstract-smart-component";

const DESCRIPTION_MAX = 140;
const ELLIPSIS_CHAR = `…`;
const ACTIVE_CLASS = `film-card__controls-item--active`;

export default class Film extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    const {
      comments,
      info,
      userDetails,
    } = this._film;
    const {
      watchlist,
      alreadyWatched,
      favorite,
    } = userDetails;

    const runtimeHours = Math.floor(info.runtime / 60);
    const runtimeMinutes = info.runtime % 60;
    const description = info.description.length > 140 ? info.description.slice(0, DESCRIPTION_MAX) + ELLIPSIS_CHAR : info.description;
    const releaseYear = new Date(info.release.date).getFullYear();
    const watchlistActiveClass = watchlist ? ACTIVE_CLASS : ``;
    const alreadyWatchedActiveClass = alreadyWatched ? ACTIVE_CLASS : ``;
    const favoriteActiveClass = favorite ? ACTIVE_CLASS : ``;

    return (
      `<article class="film-card">
      <h3 class="film-card__title">${info.title}</h3>
      <p class="film-card__rating">${info.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${runtimeHours}h ${runtimeMinutes}m</span>
        <span class="film-card__genre">${info.genre.join(` `)}</span>
      </p>
      <img src="./images/posters/${info.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistActiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatchedActiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteActiveClass}">Mark as favorite</button>
      </form>
    </article>`
    );
  }

  setTitleClickHandler(handler) {
    this.setHandler(`.film-card__title`, `click`, handler);
  }

  setPosterClickHandler(handler) {
    this.setHandler(`.film-card__poster`, `click`, handler);
  }

  setCommentsClickHandler(handler) {
    this.setHandler(`.film-card__comments`, `click`, handler);
  }

  setAddToWatchlistButtonClickHandler(handler) {
    this.setHandler(`.film-card__controls-item--add-to-watchlist`, `click`, handler);
  }

  setAlreadyWatchedButtonClickHandler(handler) {
    this.setHandler(`.film-card__controls-item--mark-as-watched`, `click`, handler);
  }

  setAddToFavoritesButtonClickHandler(handler) {
    this.setHandler(`.film-card__controls-item--favorite`, `click`, handler);
  }
}
