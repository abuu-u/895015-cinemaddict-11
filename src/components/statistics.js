import AbstractSmartComponent from './abstract-smart-component';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const LABELS = [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`];

const Period = {
  "all-time": `All time`,
  "today": `Today`,
  "week": `Week`,
  "month": `Month`,
  "year": `Year`,
};

export default class Statistics extends AbstractSmartComponent {
  constructor(films, preiods) {
    super();

    this._films = films;
    this._preiods = preiods;

    this._filmsCountByGenre = {};
  }

  getTemplate() {
    this.setFilmsCountByGenre();

    return (
      `<section class="statistic ${this._isHidden ? `` : ``}">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">Sci-Fighter</span>
        </p>

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>
          ${this._preiods.map((period) => {
        return (
          `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${period.name}" value="${period.name}" ${period.checked ? `checked` : ``}>
          <label for="statistic-${period.name}" class="statistic__filters-label">${Period[period.name]}</label>`
        );
      }).join(`\n`)}
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">
              ${this.getWatchedFilms().length ? `${this.getWatchedFilms().length} <span class="statistic__item-description">movies</span>` : 0}
            </p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">
              ${this.getWatchedFilms().length ? `${Math.floor(this.getWatchedTime() / 60)} <span class="statistic__item-description">h
              </span> ${this.getWatchedTime() % 60} <span class="statistic__item-description">m</span>` : 0}
            </p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text">${this.getTopGenre()}</p>
          </li>
        </ul>

        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>

      </section>`
    );
  }

  renderChart() {
    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector(`.statistic__chart`);

    // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
    statisticCtx.height = BAR_HEIGHT * 5;

    return new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
        datasets: [{
          data: LABELS.map((label) => this._filmsCountByGenre[label]),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  getWatchedFilms() {
    return this._films.filter((film) => film.userDetails.alreadyWatched);
  }

  getWatchedTime() {
    return Array.from(this.getWatchedFilms(), (it) => it.info.runtime).reduce((a, b) => a + b);
  }

  getTopGenre() {
    if (!this.getWatchedFilms().length) {
      return ``;
    }

    const mostWatchedGenreCount = Math.max(...Object.values(this._filmsCountByGenre));

    return Object.keys(this._filmsCountByGenre).find((key) => {
      return this._filmsCountByGenre[key] === mostWatchedGenreCount ? key : ``;
    });
  }

  setFilmsCountByGenre() {
    LABELS.forEach((label) => {
      this._filmsCountByGenre[label] = this.getWatchedFilms().filter((film) => {
        return (film.info.genre.findIndex((it) => it === label) !== -1);
      }).length;
    });
  }

  setPeriodChangeHandler(handler) {
    this.setHandler(`form`, `change`, handler);
  }
}
