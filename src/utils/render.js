// eslint-disable-next-line no-unused-vars
import { AbstractComponent } from '../view/abstract-component';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const renderElement = (container, element, place) => {
  switch(place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

/**
 *
 * @param {Element} container - DOM-element
 * @param {AbstractComponent} component  - Component
 * @param {RenderPosition} place
 */
export const renderComponent = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;

    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

/**
 *
 * @param {AbstractComponent} newComponent
 * @param {AbstractComponent} oldComponent
 */
export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const oldElement = oldComponent.getElement();
  const newElement = newComponent.getElement();
  const isExistElements = !!(parentElement && oldElement && newElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

/**
 *Remove component from page
 * @param {AbstractComponent} component
 */
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
