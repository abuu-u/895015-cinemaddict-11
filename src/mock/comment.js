import {getRandomArrayItem} from '../utils';

const author = `Ilya O'Reilly`;
const text = `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`;
const date = `2019-05-11T16:12:32.554Z`;
const emotions = [`smile`, `sleeping`, `puke`, `angry`];

const generateComment = () => {
  return {
    author,
    text,
    date,
    emotion: getRandomArrayItem(emotions),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
