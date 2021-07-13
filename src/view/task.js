//Карточка задачи
import { formatDate, formatTime } from '../utils/common';
import { AbstractComponent } from './abstract-component';

const createTaskCard = (task = {}) => {
  const {description = 'Дефолтный текст', dueDate, color, isArchive, isFavorite} = task;
  const isExpired = dueDate instanceof Date && dueDate < Date.now();

  const isDateShowing = !!dueDate;

  const date = (isDateShowing && dueDate) ? formatDate(dueDate) : '';
  const time = isDateShowing ? formatTime(dueDate) : '';
  const repeatClass = 'card--repeat';
  const deadlineClass = isExpired ? 'card--deadline' : '';
  const archiveButtonInactiveClass = isArchive ? '' : 'card__btn--disabled';
  const favoriteButtonInactiveClass = isFavorite ? '' : 'card__btn--disabled';

  return `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
	<div class="card__form">
		<div class="card__inner">
			<div class="card__control">
				<button type="button" class="card__btn card__btn--edit">
					edit
				</button>
				<button type="button" class="card__btn card__btn--archive ${archiveButtonInactiveClass}">
					archive
				</button>
				<button
					type="button"
					class="card__btn card__btn--favorites ${favoriteButtonInactiveClass}"
				>
					favorites
				</button>
			</div>

			<div class="card__color-bar">
				<svg class="card__color-bar-wave" width="100%" height="10">
					<use xlink:href="#wave"></use>
				</svg>
			</div>

			<div class="card__textarea-wrap">
				<p class="card__text">${ description || 'Дефолтный текст' }</p>
			</div>

			<div class="card__settings">
				<div class="card__details">
					<div class="card__dates">
						<div class="card__date-deadline">
							<p class="card__input-deadline-wrap">
								<span class="card__date">${date}</span>
								<span class="card__time">${time}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</article>`;
};

export default class TaskComponent extends AbstractComponent {

  constructor(task) {
    super();
    this._task = task;

    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClick = this._favoriteClick.bind(this);
    this._archiveClick = this._archiveClick.bind(this);
  }

  getTemplate() {
    return createTaskCard(this._task);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }

  _favoriteClick(evt) {
    evt.preventDefault();
    this._callback.favClick();
  }

  _archiveClick(evt) {
    evt.preventDefault();
    this._callback.archClick();
  }

	

  setEditButtonClickHandler(cb) {
    this._callback.click = cb;
    this.getElement().querySelector('.card__btn--edit').addEventListener('click', this._clickHandler);
  }

  setFavoritesButtonClickHandler(cb) {
    this._callback.favClick = cb;
    this.getElement().querySelector('.card__btn--favorites').addEventListener('click', this._favoriteClick);
  }

  setArchiveButtonClickHandler(cb) {
    this._callback.archClick = cb;
    this.getElement().querySelector('.card__btn--archive').addEventListener('click', this._archiveClick);
  }



}
