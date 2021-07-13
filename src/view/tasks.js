import { AbstractComponent } from './abstract-component';

const createTasksTemplate = () => {
  return '<div class="board__tasks"></div>';
};


export default class TaskListComponent extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return createTasksTemplate();
  }

}
