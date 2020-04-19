const createExtraFilms = (type, films) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${type}</h2>

      <div class="films-list__container">
        ${films.join(`\n`)}
      </div>
    </section>`
  );
};

export {createExtraFilms};
