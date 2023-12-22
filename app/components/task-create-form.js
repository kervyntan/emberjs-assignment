import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class TaskCreateFormComponent extends Component {
  @tracked userInput = {
    title: '',
    description: '',
    status: '',
    dueDate: null,
  };

  @tracked validity = {
    title: false,
    description: false,
    status: false,
    dueDate: false,
  };

  @tracked updatedSuccessful = false;

  @tracked areInputsValid = this.checkValidityInputs();

  @action
  preventDefault(e) {
    e.preventDefault();
  }

  @action
  checkValidityInputs() {
    for (let prop in this.validity) {
      if (this.validity[prop] == false) {
        return false;
      }
    }
    return true;
  }

  @action
  checkUserInputs() {
    for (let input in this.userInput) {
      if (input != 'dueDate' && this.userInput[input].length > 0) {
        // console.log(input)
        this.validity[input] = true;
      }

      if (input == 'dueDate') {
        if (new Date(this.userInput[input]) >= new Date()) {
          this.validity[input] = true;
        }
      }
    }
  }

  @action
  updateTaskModel() {
    if (this.checkValidityInputs()) {
      fetch('http://localhost:2000/api/Tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.userInput),
      })
        .then((res) => {
          console.log(res.json());
          console.log('Updated Task model successfully');
          this.updatedSuccessful = true;
          setTimeout(() => {
            this.updatedSuccessful = false;
          }, 100000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
