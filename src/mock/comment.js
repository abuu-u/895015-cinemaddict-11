import {getRandomArrayItem} from '../utils/common';

const author = `Ilya O'Reilly`;
const text = `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`;
const date = `2019-05-11T16:12:32.554Z`;
const emotions = [`smile`, `sleeping`, `puke`, `angry`];

const generateComment = () => {
  return {
    id: String(new Date() + Math.random()),
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
