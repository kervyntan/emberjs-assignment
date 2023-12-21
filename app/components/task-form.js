import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';

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
    // try {
    //   await fetch('http://localhost:2000/api/Tasks', {
    //     method: 'POST',
    //     body: JSON.stringify(this.userInput),
    //   });

    //   console.log('Updated Task model successfully');
    // } catch (e) {
    //   console.log(e);
    // }

    fetch('http://localhost:2000/api/Tasks', {
      method: 'POST',
      body: this.userInput,
    })
      .then((res) => {
        console.log(res.json());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  @action
  logUserInputs() {
    console.log(this.userInput);
  }
}
