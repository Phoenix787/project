import BoardComponent from './view/board';
import FilterComponent from './view/filter';
import SiteMenu from './view/site-menu';
import { generateFilters } from './mock/filter';
import { generateTasks } from './mock/task';
import { renderComponent, RenderPosition } from './utils/render';
import BoardController from './controllers/board-controller';

const TASKS_COUNT = 22;

//получаем моковые данные
const filters = generateFilters();
const tasks = generateTasks(TASKS_COUNT);

const mainElement = document.querySelector('.main');
const mainControl = mainElement.querySelector('.main__control');

renderComponent(mainControl, new SiteMenu(), RenderPosition.BEFOREEND);
renderComponent(mainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);


renderComponent(mainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render(tasks);
