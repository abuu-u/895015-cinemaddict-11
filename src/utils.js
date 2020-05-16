import {MONTH_NAMES} from './const';

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const parseDate = (date) => {
  return {
    YYYY: date.getFullYear(),
    MM: castTimeFormat(date.getMonth()),
    MMMM: MONTH_NAMES[date.getMonth()],
    DD: castTimeFormat(date.getDate()),
    HH: castTimeFormat(date.getHours()),
    mm: castTimeFormat(date.getMinutes()),
  };
};

const formatTime = (date, format) => {
  const parsedDate = parseDate(date);
  let formattedDate = format;

  for (const [key, value] of Object.entries(parsedDate)) {
    formattedDate = formattedDate.replace(new RegExp(`\\b${key}\\b`), `${value}`);
  }

  return formattedDate;
};

const render = (container, template, place = `beforeend`) => {
  return container.insertAdjacentHTML(place, template);
};

export {getRandomIntegerNumber, getRandomArrayItem, formatTime, render};
