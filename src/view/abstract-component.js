import { createElement } from '../utils/render';

export class AbstractComponent {
  constructor() {
    if(new.target === AbstractComponent) {
      throw new Error('Can\'t instatiate Abstract class, only concrete one');
    }
    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: ${this.getTemplate.name}`);
  }
  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
