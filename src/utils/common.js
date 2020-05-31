import moment from "moment";

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const formatTime = (date, format) => {
  return moment(date).format(format);
};

export {
  getRandomIntegerNumber,
  getRandomArrayItem,
  formatTime,
};
