import {MONTH_NAMES} from './const';

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

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

const render = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  formatTime,
  render,
  createElement,
  RenderPosition,
};
