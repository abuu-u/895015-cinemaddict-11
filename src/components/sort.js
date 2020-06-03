import AbstractComponent from "./abstract-component";

const ACTIVE_CLASS = `sort__button--active`;

const SortText = {
  "default": `Sort by default`,
  "by-date": `Sort by date`,
  "by-rating": `Sort by rating`,
};


export default class Sort extends AbstractComponent {
  constructor(sorts) {
    super();

    this._sorts = sorts;
  }

  getTemplate() {
    return (
      `<ul class="sort">
        ${this._sorts.map((sort) => {
        return (
          `<li>
            <a href="#" data-sort-type="${sort.name}"
            class="sort__button ${sort.checked ? ACTIVE_CLASS : ``}">
            ${SortText[sort.name]}</a>
          </li>`
        );
      }).join(`\n`)}
    </ul>`
    );
  }

  setSortChangeHandler(handler) {
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
