import {generateComments} from './comment';
import {generateDescription} from './description';
import {getRandomIntegerNumber, getRandomArrayItem} from '../utils/common';

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const Description = {
  MIN: 1,
  MAX: 5,
};

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const Comment = {
  MIN: 0,
  MAX: 5,
};

const ratingMax = 10;

const Runtime = {
  MIN: 77,
  MAX: 177,
};

const generateFilm = () => {
  return {
    comments: generateComments(getRandomIntegerNumber(Comment.MIN, Comment.MAX)),
    info: {
      title: `Made for Each Other`,
      alternativeTitle: `Made for Each Other`,
      totalRating: Math.round((Math.random() * ratingMax + Number.EPSILON) * 10) / 10,
      poster: getRandomArrayItem(posters),
      ageRating: 0,
      director: `Tom Ford`,
      writers: [
        `Takeshi Kitano`,
      ],
      actors: [
        `Morgan Freeman`,
      ],
      release: {
        date: `2019-05-11T00:00:00.000Z`,
        country: `Finland`,
      },
      runtime: getRandomIntegerNumber(Runtime.MIN, Runtime.MAX),
      genre: [
        `Comedy`,
      ],
      description: generateDescription(descriptionText, getRandomIntegerNumber(Description.MIN, Description.MAX)),
    },
    userDetails: {
      watchlist: Math.random() > 0.5,
      alreadyWatched: Math.random() > 0.5,
      watchingDate: `2019-04-12T16:12:32.554Z`,
      favorite: Math.random() > 0.5,
    },
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilms};
