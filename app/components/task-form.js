import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TaskFormComponent extends Component {
  @tracked userInputs = { title: '', description: '', status: '', dueDate: '' };
  @tracked hasSubmitted = false;

  @action
  updateTaskModel() {
    console.log('Updated Task model successfully');
  }
}
