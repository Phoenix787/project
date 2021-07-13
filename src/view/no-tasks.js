import { AbstractComponent } from './abstract-component';

const createNoTasksTemplate = () => {
  return `<p class="board__no-tasks">
	Click «ADD NEW TASK» in menu to create your first task
</p>`;
};

export default class NoTasksComponent extends AbstractComponent {
  constructor () {
    super();
  }

  getTemplate() {
    return createNoTasksTemplate();
  }
}
