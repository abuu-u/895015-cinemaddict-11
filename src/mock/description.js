import {getRandomIntegerNumber} from '../utils/common';

const generateDescription = (text, count) => {
  const sentences = text.split(`. `);

  while (count < sentences.length) {
    sentences.splice(getRandomIntegerNumber(0, sentences.length - 1), 1);
  }

  return sentences.join(`. `);
};

export {generateDescription};
