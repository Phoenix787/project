import { ESC_CODE } from '../utils/common';
import { remove, renderComponent, RenderPosition, replace } from '../utils/render';
import TaskEditComponent from '../view/edit-task';
import TaskComponent from '../view/task';

const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit',
};


export class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onViewChange = onViewChange;
    this._onDataChange = onDataChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.code === ESC_CODE;
    if(isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener('keydown', this._onEscKeyDown);
    }
  }

  _replaceTasktoEdit () {
    this._onViewChange();
    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.EDIT;
    //taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  }

  _replaceEditToTask () {
    this._taskEditComponent.reset();
    replace(this._taskComponent, this._taskEditComponent);
    this._mode = Mode.DEFAULT;
  }

  render(task) {

    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    if(oldTaskComponent && oldTaskEditComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      renderComponent(this._container, this._taskComponent, RenderPosition.BEFOREEND);
    }


    //устанавливаем слушателей

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTasktoEdit();
      document.addEventListener('keydown', this._onEscKeyDown);
    });

    this._taskEditComponent.setSubmitHandler(() => {
      this._replaceEditToTask();
      document.removeEventListener('keydown', this._onEscKeyDown);
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(task, Object.assign({}, task, {isFavorite: !task.isFavorite}));
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(task, Object.assign({}, task, {isArchive: !task.isArchive}));
    });

  }

  setDefaultView() {
    if(this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  destroy() {
    remove(this._taskComponent);
    remove(this._taskEditComponent);
    removeEventListener('keydown', this._onEscKeyDown);
  }


}
