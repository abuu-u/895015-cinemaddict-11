import {getRandomIntegerNumber} from '../utils';

const generateDescription = (description) => {
  const {text, min, max} = description;

  const sentences = text.split(`. `);
  const sentencesCount = getRandomIntegerNumber(min, max);

  while (sentencesCount < sentences.length) {
    sentences.splice(getRandomIntegerNumber(0, sentences.length - 1), 1);
  }

  return sentences.join(`. `);
};

export {generateDescription};
