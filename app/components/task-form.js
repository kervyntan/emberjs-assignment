import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TaskFormComponent extends Component {
  @tracked userInput = {
    title: '',
    description: '',
    status: '',
    dueDate: null,
  };
  @tracked hasSubmitted = false;

  @action
  updateTaskModel() {
    console.log('Updated Task model successfully');
  }

  @action
  logUserInputs() {
    console.log(this.userInput);
  }
}
