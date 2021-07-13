import dayjs from 'dayjs';
import 'dayjs/locale/ru';


// const castTimeFormat = (value) => {
//   return value < 10 ? `0${value}` : String(value);
// };

export const formatTime = (date) => {
  // const hours = castTimeFormat(date.getHours() ); // % 12
  // const minutes = castTimeFormat(date.getMinutes());
  // return `${hours}:${minutes}`;

  return dayjs(date).format('HH:mm');
};

export const formatDate = (date) => {
  return dayjs(date).locale('ru').format('DD MMMM YYYY');
};

export const getRandomArrayItem = (arr) => {
  return arr[getRandomInteger(0, arr.length)];
};

export const getRandomInteger = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const SHOWING_TASKS_COUNT_ON_START = 8;
export const SHOWING_TASKS_COUNT_BUTTON = 8;
export const ESC_CODE = 'Escape';
