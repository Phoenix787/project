import { AbstractComponent } from './abstract-component';

/**
 * Class representing a filters component
 */
export default class FilterComponent extends AbstractComponent {
  /**
	 * create a component
	 * @param {Array.<Object>} filters - array of filter's objects
	 */
  constructor (filters) {
    super();
    this._filters = filters;
  }

  /**
	 *
	 * @returns {ChildNode}  the html-element
	 */
  getTemplate() {
    return createFilters(this._filters);
  }
}


const createFiltersItemTemplate = (filter, isChecked) => {
  const { name: filterId, count } = filter;
  return `<input
		type="radio"
		id="filter__${filterId}"
		class="filter__input visually-hidden"
		name="filter"
		${isChecked ? 'checked' : ''}
		${count ? '' : 'disabled'} />
	<label for="filter__${filterId}" class="filter__label">
		${filterId} <span class="filter__${filterId}-count">${count}</span></label
	>`;
};


const createFilters = (filters) => {
  const filtersMarkup = filters
    .map((it, i) => createFiltersItemTemplate(it, i === 0))
    .join('\n');

  return `<section class="main__filter filter container">
			${filtersMarkup}
		</section>
		`;
};

