import AbstractComponent from "./abstract-component";

const SortType = {
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`,
  DEFAULT: `default`,
};

export default class Sort extends AbstractComponent {
  getTemplate() {
    return (
      `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
    );
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });

  }
}

export {SortType};
