import {formatTime} from '../utils/common';
import AbstractSmartComponent from "./abstract-smart-component";
import {DateFormat} from '../const';

const EMOJIS = [`smile`, `sleeping`, `puke`, `angry`];

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
    this._emoji = null;
  }

  createComments(comment) {
    const {
      author,
      text,
      emotion,
    } = comment;

    const date = formatTime(new Date(comment.date), DateFormat.comment);

    return (
      `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
    );
  }

  createNewComment() {
    return (
      `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">
          ${this._emoji ? `<img src="images/emoji/${this._emoji}.png" width="55" height="55" alt="emoji-${this._emoji}">` : ``}
        </div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
        ${EMOJIS.map((emoji) => {
        return (
          `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
            id="emoji-${emoji}"
            value="${emoji}"
            ${this._emoji === emoji ? `checked` : ``}>
            <label class="film-details__emoji-label" for="emoji-${emoji}">
            <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
          </label>`
        );
      }).join(`\n`)}
        </div>
      </div>`
    );
  }

  getTemplate() {
    const {
      info,
      userDetails,
    } = this._film;
    const {
      country,
    } = info.release;
    const {
      watchlist,
      alreadyWatched,
      favorite,
    } = userDetails;

    const date = formatTime(new Date(info.release.date), DateFormat.release);
    const runtimeHours = Math.floor(info.runtime / 60);
    const runtimeMinutes = info.runtime % 60;
    const genre = info.genre.length > 1 ? `s` : ``;
    const watchlistChecked = watchlist ? `checked` : ``;
    const alreadyWatchedChecked = alreadyWatched ? `checked` : ``;
    const favoriteChecked = favorite ? `checked` : ``;
    const comments = this._film.comments.map(this.createComments);
    const newComment = this.createNewComment();

    return (
      `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${info.poster}" alt="">

              <p class="film-details__age">${info.ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${info.title}</h3>
                  <p class="film-details__title-original">Original:${info.alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${info.totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${info.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${info.writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${info.actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${date}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtimeHours}h ${runtimeMinutes}m</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genre${genre}</td>
                  <td class="film-details__cell">
                    ${info.genre.join(` `)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${info.description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist"
                    name="watchlist" ${watchlistChecked}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched"
                    name="watched" ${alreadyWatchedChecked}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite"
                    name="favorite" ${favoriteChecked}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
            ${comments.join(``)}
            </ul>

            ${newComment}
          </section>
        </div>
      </form>
    </section>`
    );
  }

  setEmoji(emoji) {
    this._emoji = emoji;
  }

  setCloseClickHandler(handler) {
    this.setHandler(`.film-details__close-btn`, `click`, handler);
  }

  setAddToWatchlistButtonClickHandler(handler) {
    this.setHandler(`.film-details__control-label--watchlist`, `click`, handler);
  }

  setAlreadyWatchedButtonClickHandler(handler) {
    this.setHandler(`.film-details__control-label--watched`, `click`, handler);
  }

  setAddToFavoritesButtonClickHandler(handler) {
    this.setHandler(`.film-details__control-label--favorite`, `click`, handler);
  }

  setEmojiChangeHandler(handler) {
    this.setHandler(`.film-details__emoji-list`, `change`, handler);
  }
}
