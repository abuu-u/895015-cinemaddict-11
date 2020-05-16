const DESCRIPTION_MAX = 140;
const ELLIPSIS_CHAR = `…`;

const createFilmTemplate = (film) => {
  const {
    comments,
    info,
    userDetails,
  } = film;
  const {
    title,
    totalRating,
    poster,
    release,
    runtime,
    genre,
    description,
  } = info;
  const {
    watchlist,
    alreadyWatched,
    favorite,
  } = userDetails;

  const releaseYear = new Date(release.date).getFullYear();
  const activeClass = `film-card__controls-item--active`;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${Math.floor(runtime / 60)}h ${runtime % 60}m</span>
        <span class="film-card__genre">${genre.join(` `)}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.length > 140 ? description.slice(0, DESCRIPTION_MAX) + ELLIPSIS_CHAR : description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? activeClass : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${alreadyWatched ? activeClass : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? activeClass : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {createFilmTemplate};
