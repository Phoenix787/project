import { AbstractComponent } from './abstract-component';

// button 'load more'
const createLoadMoreElement = () => {
  // eslint-disable-next-line quotes
  return (`<button class="load-more" type="button">load more</button>`);
};

export default class LoadMoreComponent extends AbstractComponent {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createLoadMoreElement();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(cb) {
    this._callback.click = cb;
    this.getElement().addEventListener('click', this._clickHandler);
  }

}
