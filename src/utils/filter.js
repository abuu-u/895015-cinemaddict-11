import {FilterType} from "../const.js";

const getWatchlistFilms = (films) => {
  return films.filter((film) => film.userDetails.watchlist);
};

const getAlreadyWatchedFilms = (films) => {
  return films.filter((film) => film.userDetails.alreadyWatched);
};

const getFavoriteFilms = (films) => {
  return films.filter((film) => film.userDetails.favorite);
};

const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterType.HISTORY:
      return getAlreadyWatchedFilms(films);
    case FilterType.FAVORITES:
      return getFavoriteFilms(films);
  }

  return films;
};

export {
  getFilmsByFilter,
  getWatchlistFilms,
  getAlreadyWatchedFilms,
  getFavoriteFilms,
};
