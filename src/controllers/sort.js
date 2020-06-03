import SortComponent from "../components/sort.js";
import {SortType} from "../const.js";
import {render, replace} from "../utils/render.js";

export default class SortController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeSortType = SortType.DEFAULT;
    this._sortComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const sorts = Object.values(SortType).map((sortType) => {
      return {
        name: sortType,
        checked: sortType === this._activeSortType,
      };
    });
    const oldComponent = this._sortComponent;

    this._sortComponent = new SortComponent(sorts);
    this._sortComponent.setSortChangeHandler(this._onSortChange);

    if (oldComponent) {
      replace(this._sortComponent, oldComponent);
    } else {
      render(container, this._sortComponent);
    }
  }

  _onSortChange(sortType) {
    if (this._activeSortType === sortType) {
      return;
    }

    this._filmsModel.setSort(sortType);
    this._activeSortType = sortType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
