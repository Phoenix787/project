//Board component
import { AbstractComponent } from './abstract-component';


const createBoardComponent = () => {
  //const tasksMarkup = tasks.slice(1).map((it) => createTaskCard(it)).join('\n');
  return `<section class="board container">
		
		</section>`;
};

export default class BoardComponent extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createBoardComponent();
  }
}
