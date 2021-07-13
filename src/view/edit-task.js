import { COLORS, WEEK_DAYS } from '../const';
import { formatDate, formatTime } from '../utils/common';
import { AbstractSmartComponent } from './abstract-smart-component';

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import { Russian } from 'flatpickr/dist/l10n/ru.js';

flatpickr.localize(Russian);

const createColorMarkup = (colors, currentColor) => {

  return colors
    .map((color, index) => {
      return (`
			<input
							type="radio"
							id="color-${color}-${index}"
							class="card__color-input card__color-input--${color} visually-hidden"
							name="color"
							value="${color}"
							${currentColor === color ? 'checked' : ''}
						/>
						<label
							for="color-${color}-${index}"
							class="card__color card__color--${color}"
							>${color}</label
						>
			`);
    }).join('\n');
};

// const createRepeatingDaysMarkup = (repeatDays) => {
//   return repeatDays.map((repeatDay, index) => {
//     const [dayName, isChecked] = repeatDay;
//     return (`
// 		<input
// 			class="visually-hidden card__repeat-day-input"
// 			type="checkbox"
// 			id="repeat-${dayName}-${index}"
// 			name="repeat"
// 			value="${dayName}"
// 			${isChecked ? 'checked' : ''}
// 		/>
// 		<label class="card__repeat-day" for="repeat-${dayName}-${index}"
// 			>${dayName}</label
// 		>
// 		`);
//   }).join('\n');
// };

const createRepeatingDaysMarkup = (days, repeatDays) => {
  return days.map((day, index) => {
    const isChecked = repeatDays[day];
    return (`
		<input
			class="visually-hidden card__repeat-day-input"
			type="checkbox"
			id="repeat-${day}-${index}"
			name="repeat"
			value="${day}"
			${isChecked ? 'checked' : ''} 
		/>
		<label class="card__repeat-day" for="repeat-${day}-${index}"
			>${day}</label
		>
		`);
  }).join('\n');
};

const createAddEditTaskTemplate = (task = {}, options = {}) => {
  const { color = 'yellow', description:taskText = 'Here is a card with filled data', dueDate, repeatingDate } = task;
  const { isDateShowing, isRepeatingTask, activeRepeatingDays } = options;


  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  //const isDateShowing = !!dueDate;
  // const date = (isDateShowing && dueDate) ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : '';
  const date = (isDateShowing && dueDate) ? formatDate(dueDate) : '';
  const time = (isDateShowing && dueDate) ? formatTime(dueDate): '';

  //const time = isDateShowing ? dueDate.toLocaleTimeString() : '';

  //const isRepeatingTask = Object.values(repeatingDate).some(Boolean);
  const repeatClass =  isRepeatingTask ? 'card--repeat' : '';

  const deadlineClassName = isExpired ? 'card--deadline' : '';

  //const repeatDaysMarkup = createRepeatingDaysMarkup(Object.entries(repeatingDate));
  const repeatDaysMarkup = createRepeatingDaysMarkup(WEEK_DAYS, activeRepeatingDays);
  const colorMarkup = createColorMarkup(COLORS, color);

  return `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClassName}">
	<form class="card__form" method="get">
		<div class="card__inner">
			<div class="card__color-bar">
				<svg class="card__color-bar-wave" width="100%" height="10">
					<use xlink:href="#wave"></use>
				</svg>
			</div>

			<div class="card__textarea-wrap">
				<label>
					<textarea
						class="card__text"
						placeholder="Start typing your text here..."
						name="text"
					>${taskText || 'Какой-то дефолтный текст, так как в моках пусто'}</textarea>
				</label>
			</div>

			<div class="card__settings">
				<div class="card__details">
					<div class="card__dates">
						<button class="card__date-deadline-toggle" type="button">
							date: <span class="card__date-status">${isDateShowing ? 'yes' : 'no'}</span>
						</button>

						<fieldset class="card__date-deadline" ${isDateShowing ? '' : 'disabled'}>
							<label class="card__input-deadline-wrap">
								<input
									class="card__date"
									type="text"
									placeholder=""
									name="date"
									value="${date} ${time}"
								/>
							</label>
						</fieldset>

						<button class="card__repeat-toggle" type="button">
							repeat:<span class="card__repeat-status">${isRepeatingTask ? 'yes' : 'no'}</span>
						</button>

						${isRepeatingTask ?
    `<fieldset class="card__repeat-days">
						<div class="card__repeat-days-inner">
						${ repeatDaysMarkup }
						</div>
					</fieldset>` : ''}
						
					</div>
				</div>

				<div class="card__colors-inner">
					<h3 class="card__colors-title">Color</h3>
					<div class="card__colors-wrap">
						${colorMarkup}
					</div>
				</div>
			</div>

			<div class="card__status-btns">
				<button class="card__save" type="submit">save</button>
				<button class="card__delete" type="button">delete</button>
			</div>
		</div>
	</form>
	</article>`;
};

export default class TaskEditComponent extends AbstractSmartComponent {
  constructor(task) {
    super();
    this._task = task;
    this._flatpickr = null;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDate).some(Boolean);
    //this._activeRepeatingDays = Object.entries(task.repeatingDate);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDate);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._subscribeOnEvents();
    this._applyFlatPickr();
  }

  getTemplate() {
    return createAddEditTaskTemplate(this._task, {
      isDateShowing: this._isDateShowing,
      isRepeatingTask: this._isRepeatingTask,
      activeRepeatingDays: this._activeRepeatingDays,
    });
  }

  recoveryListeners() {
    this.setSubmitHandler(this._callback.formSubmit);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatPickr();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    element
      .querySelector('.card__date-deadline-toggle')
      .addEventListener('click', () => {
        this._isDateShowing = !this._isDateShowing;
        this.rerender();
      });

    element
      .querySelector('.card__repeat-toggle')
      .addEventListener('click', () => {
        this._isRepeatingTask = !this._isRepeatingTask;
        this.rerender();
      });

    const repeatingDays = element.querySelector('.card__repeat-days');
    if(repeatingDays) {
      repeatingDays.addEventListener('change', (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;
        this.rerender();
      });
    }

    const dateInput = element.querySelector('.card__date');
    if (dateInput) {
      dateInput.addEventListener('change', (evt) => {
        console.log(evt.target.value);
      });
    }
  }

  _applyFlatPickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowing) {
      const dateElement = this.getElement().querySelector('.card__date');
      this._flatpickr = flatpickr(dateElement, {
        altInput: false,
        allowInput: true,
        dateFormat: 'd M Y H:m',
        // altFormat: 'd M Y H::m',
        defaultDate: this._task.dueDate || 'today',
      });
    }
  }

  _dateChange(evt) {
    evt.preventDefault();
    this._callback.editDateInput();
  }

  setSubmitHandler(cb) {
    this._callback.formSubmit = cb;
    this.getElement()
      .querySelector('.card__form')
      .addEventListener('submit', this._formSubmitHandler);
  }

  setDateEditInputHandler(cb) {
    this._callback.editDateInput = cb;
    this.getElement().querySelector('.card__date').addEventListener('change', this._dateChange );
  }

  reset() {
    const task = this._task;

    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDate).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDate);
    this.rerender();
  }
}
