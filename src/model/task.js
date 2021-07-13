
export default class Task {

  constructor(dueDate, repeatingDate, description, color) {
    this.dueDate = dueDate;
    this.repeatingDate = repeatingDate;
    this.description =description;
    this.color = color;
    this.isArchive = false;
    this.isFavorite = false;
  }

  // get dueDate() {
  //   return this.dueDate;
  // }

  // set dueDate(newDueDate) {
  //   this.dueDate = newDueDate;
  // }


}
