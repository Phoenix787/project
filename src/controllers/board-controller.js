import { SHOWING_TASKS_COUNT_BUTTON, SHOWING_TASKS_COUNT_ON_START } from '../utils/common';
import { remove, renderComponent, RenderPosition } from '../utils/render';
import LoadMoreComponent from '../view/load-more';
import NoTasksComponent from '../view/no-tasks';
import SortComponent, { SortType } from '../view/sort';
import TaskListComponent from '../view/tasks';
import { TaskController } from './task';

export default class BoardController {
  /**
	 *
	 * @param {BoardComponent} container - view-component
	 */
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = []; // сюда мы будем складывать таск-контроллеры для Наблюдателя

    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TaskListComponent();
    this._loadMoreButtonComponent = new LoadMoreComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

  }

  render(tasks) {

    this._tasks = tasks;

    const container = this._container.getElement();
    const isAllTasksArchive = this._tasks.every((task) => task.isArchive);
    if (isAllTasksArchive) {
      renderComponent(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }
    renderComponent(container, this._sortComponent, RenderPosition.BEFOREEND);
    renderComponent(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = container.querySelector('.board__tasks');

    const newTasks = renderTasks(taskListElement, tasks.slice(0, 	this._showingTasksCount), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._showingTasksCount = this._showedTaskControllers.length;

    this._renderLoadMoreButton();

  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();
    renderComponent(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;
      this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BUTTON;
      const sortedTasks = getSortedTasks(this._tasks, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksCount);
      const newTasks = renderTasks(this._tasksComponent.getElement(), sortedTasks, this._onDataChange, this._onViewChange);

      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if(this._showingTasksCount >= this._tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_BUTTON;
    const sortedTasks = getSortedTasks(this._tasks, sortType, 0, this._showingTasksCount);
    this._tasksComponent.innerHTML = '';
    const newTasks = renderTasks(this._tasksComponent, sortedTasks);
    this._showedTaskControllers = newTasks;
    this._renderLoadMoreButton();
  }

  _onDataChange(oldTask, newTask) {
    const index = this._tasks.findIndex((it) => it === oldTask);
    if (index === -1) {
      return;
    }
    this._tasks = [].concat(this._tasks.slice(0, index), newTask, this._tasks.slice(index+1));
    this._updateTasks(this._showingTasksCount);

  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }
  _updateTasks(count) {
    this._removeTasks();
    const taskListElement = this._tasksComponent.getElement();
    const newTasks = renderTasks(taskListElement, this._tasks.slice(0, count), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._renderLoadMoreButton();
  }

  _removeTasks() {
    this._showedTaskControllers.forEach((taskController) => taskController.destroy());
    this._showedTaskControllers = [];
  }
}

const renderTasks = (tasksListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(tasksListElement, onDataChange, onViewChange);
    taskController.render(task);
    return taskController;
  });
};


const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();
  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }
  return sortedTasks.slice(from, to);
};
