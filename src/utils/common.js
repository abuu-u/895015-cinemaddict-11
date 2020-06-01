import moment from "moment";
import {DateFormat} from '../const';

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const formatTime = (date, format) => {
  const formattedDate = ``;

  switch (format) {
    case DateFormat.comment:
      return moment.duration(date - new Date()).humanize(true);
    case DateFormat.release:
      return moment(date).format(format);
  }

  return formattedDate;
};

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  formatTime,
};
