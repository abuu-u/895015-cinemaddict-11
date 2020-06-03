import {SortType} from "../const.js";

const getSortedFilms = (films, sortType) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.BY_DATE:
      sortedFilms = showingFilms.sort((a, b) => {
        return new Date(b.info.release.date) - new Date(a.info.release.date);
      });
      break;
    case SortType.BY_RATING:
      sortedFilms = showingFilms.sort((a, b) => {
        return b.info.totalRating - a.info.totalRating;
      });
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms;
};

export {getSortedFilms};
