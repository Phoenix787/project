import { AbstractComponent } from './abstract-component';

const createMenuItemTemplate = (
  idMenuItem,
  textMenu,
  adClass = '',
  isChecked = false) => {
  return `<input type="radio"
			name="control"
			id="control__${idMenuItem}"
			class="control__input visually-hidden"
			${isChecked ? 'checked' : ''}	/>
			<label for="control__${idMenuItem}" class="control__label ${adClass}">${textMenu}</label>
		`;
};

const createMenuTemplate = function () {

  return `<section class="control__btn-wrap">
		${createMenuItemTemplate('new-task', '+ ADD NEW TASK', 'control__label--new-task')}
		${createMenuItemTemplate('task', 'TASKS', '', true)}
		${createMenuItemTemplate('statistic', 'STATISTICS', '')}
		</section>
		`;
};

export default class SiteMenu extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createMenuTemplate();
  }
}
