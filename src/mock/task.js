import { COLORS } from '../const';
import Task from '../model/task';
import { getRandomInteger, getRandomArrayItem } from '../utils/common';


const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const DescriptionItems = [
  'Изучить теорию',
  'Сделать домашнее задание',
  'Пройти интенсив на соточку'];

const generateRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomInteger(0, 8);
  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {'mo': Math.random() > 0.5, 'fr': Math.random() > 0.5});
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : generateRandomDate();
  // return {
  //   description: getRandomArrayItem(DescriptionItems),
  //   color: getRandomArrayItem(COLORS),
  //   dueDate,
  //   isArchive: Math.random() > 0.5,
  //   isFavorite: Math.random() > 0.5,
  //   repeatingDate: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
  // };
  const task = new Task(dueDate,
    dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    getRandomArrayItem(DescriptionItems),
    getRandomArrayItem(COLORS));
  task.isArchive = Math.random() > 0.5;
  task.isFavorite = Math.random() > 0.5;

  return task;
};

const generateTasks = (count) => {
  return new Array(count)
    .fill('')
    .map(generateTask);
};

export {generateTask, generateTasks};
