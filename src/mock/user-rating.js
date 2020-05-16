import {getRandomIntegerNumber} from "../utils";

const watchedFilmsCount = {
  min: 0,
  max: 30,
  get() {
    return getRandomIntegerNumber(this.min, this.max);
  },
}

const generateWatchedFilms = () => {
  return watchedFilmsCount.get();
};

export {generateWatchedFilms};
