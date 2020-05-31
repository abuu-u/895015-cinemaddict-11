import FilmComponent from "../components/film";
import FilmDetailsComponent from "../components/film-details";
import {ESC_KEY} from "../const";
import {render, replace} from "../utils/render";

const Emoji = {
  "emoji-smile": `smile`,
  "emoji-sleeping": `sleeping`,
  "emoji-puke": `puke`,
  "emoji-angry": `angry`,
};

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};
export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._film = null;
    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._renderFilmDetails = this._renderFilmDetails.bind(this);
    this._onFilmDetailsCloseClick = this._onFilmDetailsCloseClick.bind(this);
    this._onFilmDetailsPressEsc = this._onFilmDetailsPressEsc.bind(this);
    this._onWatchlistClick = this._onWatchlistClick.bind(this);
    this._onAlreadyWatchedClick = this._onAlreadyWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onEmojiChange = this._onEmojiChange.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._film = film;
    this._filmComponent = new FilmComponent(this._film);
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);

    this._filmComponent.setTitleClickHandler(this._renderFilmDetails);
    this._filmComponent.setPosterClickHandler(this._renderFilmDetails);
    this._filmComponent.setCommentsClickHandler(this._renderFilmDetails);
    this._filmComponent.setAddToWatchlistButtonClickHandler(this._onWatchlistClick);
    this._filmComponent.setAlreadyWatchedButtonClickHandler(this._onAlreadyWatchedClick);
    this._filmComponent.setAddToFavoritesButtonClickHandler(this._onFavoriteClick);

    this._filmDetailsComponent.setCloseClickHandler(this._onFilmDetailsCloseClick);
    this._filmDetailsComponent.setAddToWatchlistButtonClickHandler(this._onWatchlistClick);
    this._filmDetailsComponent.setAlreadyWatchedButtonClickHandler(this._onAlreadyWatchedClick);
    this._filmDetailsComponent.setAddToFavoritesButtonClickHandler(this._onFavoriteClick);
    this._filmDetailsComponent.setEmojiChangeHandler(this._onEmojiChange);

    if (oldFilmDetailsComponent && oldFilmComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeFilmDetails();
    }
  }

  _renderFilmDetails() {
    this._onViewChange();
    document.body.appendChild(this._filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, this._onFilmDetailsPressEsc);
    this._mode = Mode.DETAILS;
  }

  _removeFilmDetails() {
    document.body.removeChild(this._filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, this._onFilmDetailsPressEsc);
    this._mode = Mode.DEFAULT;
  }

  _onFilmDetailsCloseClick() {
    this._removeFilmDetails();

    this._filmDetailsComponent.setEmoji(null);
    this._filmDetailsComponent.rerender();
  }

  _onFilmDetailsPressEsc(evt) {
    if (evt.key === ESC_KEY) {
      this._removeFilmDetails();

      this._filmDetailsComponent.setEmoji(null);
      this._filmDetailsComponent.rerender();
    }
  }

  _changeData(object, key) {
    this._onDataChange(object, Object.assign({}, object, {
      userDetails: Object.assign({}, object.userDetails, {
        [`${key}`]: !object.userDetails[key],
      })
    }));

    this._filmComponent.rerender();
    this._filmDetailsComponent.rerender();
  }

  _onWatchlistClick(evt) {
    evt.preventDefault();

    this._changeData(this._film, `watchlist`);
  }

  _onAlreadyWatchedClick(evt) {
    evt.preventDefault();

    this._changeData(this._film, `alreadyWatched`);
  }

  _onFavoriteClick(evt) {
    evt.preventDefault();

    this._changeData(this._film, `favorite`);
  }

  _onEmojiChange(evt) {
    if (evt.target.tagName === `INPUT`) {
      this._filmDetailsComponent.setEmoji(Emoji[evt.target.id]);
      this._filmDetailsComponent.rerender();
    }
  }
}
