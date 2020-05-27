import AbstractComponent from "./abstract-component";

const SortType = {
  DEFAULT: `default`,
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`,
};

const ACTIVE_CLASS = `sort__button--active`;

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  getTemplate() {
    const defaultActiveClass = this._currenSortType === SortType.DEFAULT ? ACTIVE_CLASS : ``;
    const byDatetActiveClass = this._currenSortType === SortType.BY_DATE ? ACTIVE_CLASS : ``;
    const byRatingActiveClass = this._currenSortType === SortType.BY_RATING ? ACTIVE_CLASS : ``;

    return (
      `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${defaultActiveClass}">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_DATE}" class="sort__button ${byDatetActiveClass}">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.BY_RATING}" class="sort__button ${byRatingActiveClass}">Sort by rating</a></li>
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
