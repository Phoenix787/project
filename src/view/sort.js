import { AbstractComponent } from './abstract-component';

export const SortType = {
  DEFAULT: 'default',
  DATE_UP: 'date-up',
  DATE_DOWN: 'date_down',
};

const createSortComponent = () => {

  const createSortItem = (text, sortType) => {
    return `<a href="#" class="board__filter" data-sort-type=${sortType}>${text}</a>`;
  };

  return `<div class="board__filter-list">
			${createSortItem('SORT BY DEFAULT', SortType.DEFAULT)}
			${createSortItem('SORT BY DATE up', SortType.DATE_UP)}
			${createSortItem('SORT BY DATE down', SortType.DATE_DOWN)}
			
		</div>`;
};

export default class SortComponent extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortComponent();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();
      if(evt.target.tagName !== 'A') {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if(this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }

}
