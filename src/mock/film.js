import {generateComments} from './comment';
import {generateDescription} from './description';
import {getRandomIntegerNumber} from '../utils';
import {getRandomArrayItem} from '../utils';

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const description = {
  min: 1,
  max: 5,
  getCount() {
    return getRandomIntegerNumber(this.min, this.max);
  },
};

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const comment = {
  min: 0,
  max: 5,
  getCount() {
    return getRandomIntegerNumber(this.min, this.max);
  },
};

const ratingMax = 10;

const runtime = {
  min: 77,
  max: 177,
  get() {
    return getRandomIntegerNumber(this.min, this.max);
  },
};

const generateFilm = () => {
  return {
    comments: generateComments(comment.getCount()),
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
      runtime: runtime.get(),
      genre: [
        `Comedy`,
      ],
      description: generateDescription(descriptionText, description.getCount()),
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
