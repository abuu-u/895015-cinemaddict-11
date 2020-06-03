import StatisticsComponent from "../components/statistics.js";
import {render, replace} from "../utils/render.js";
import DateDiff from 'date-diff';

const Period = {
  all: `all-time`,
  today: `today`,
  week: `week`,
  month: `month`,
  year: `year`,
};

export default class StatisticsController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._films = [];

    this._activePeriod = Period.all;
    this._statisticsComponent = null;
    this._isHidden = true;

    this.onPeriodChange = this.onPeriodChange.bind(this);
  }

  render() {
    this._films = this._filmsModel.getFilmsAll();

    const oldComponent = this._statisticsComponent;
    const periods = Object.values(Period).map((preiod) => {
      return {
        name: preiod,
        checked: preiod === this._activePeriod,
      };
    });

    this._statisticsComponent = new StatisticsComponent(this.getFilmsByPeriod(), periods);
    this._statisticsComponent.setPeriodChangeHandler(this.onPeriodChange);

    if (oldComponent) {
      replace(this._statisticsComponent, oldComponent);
      this._statisticsComponent.renderChart();
      if (this._isHidden) {
        this.hide();
      }
    } else {
      render(this._container, this._statisticsComponent);
      this._statisticsComponent.renderChart();
      if (this._isHidden) {
        this.hide();
      }
    }
  }

  show() {
    this._statisticsComponent.show();
    this._isHidden = false;
  }

  hide() {
    this._statisticsComponent.hide();
    this._isHidden = true;
  }

  getFilmsByPeriod() {
    switch (this._activePeriod) {
      case Period.all:
        return this._films;
      case Period.today:
        return this._films.filter((film) => {
          return new DateDiff(new Date(), new Date(film.userDetails.watchingDate)).days() <= 1;
        });
      case Period.week:
        return this._films.filter((film) => {
          return new DateDiff(new Date(), new Date(film.userDetails.watchingDate)).weeks() <= 1;
        });
      case Period.month:
        return this._films.filter((film) => {
          return new DateDiff(new Date(), new Date(film.userDetails.watchingDate)).months() <= 1;
        });
      case Period.year:
        return this._films.filter((film) => {
          return new DateDiff(new Date(), new Date(film.userDetails.watchingDate)).years() <= 1;
        });
    }

    return 1;
  }

  onPeriodChange(evt) {
    if (evt.target.tagName === `INPUT`) {
      this._activePeriod = evt.target.value;
      this.render();
    }
  }
}
