import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class TaskUpdateForm extends Component {
  @tracked userInput = {
    existingTitle: '',
    title: '',
    description: '',
    status: '',
    dueDate: null,
  };

  @tracked toUpdate = { ...this.userInput };

  @tracked validity = {
    existingTitle: '',
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
    console.log(this.checkValidityInputs());
    console.log(this.validity);
    if (this.checkValidityInputs()) {
      // find the ID for the task first
      fetch('http://localhost:2000/api/Tasks')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const index = data.find(
            (task) =>
              task.title.toLowerCase() ==
              this.userInput.existingTitle.toLowerCase(),
          );
          if (index != undefined) {
            const taskID = index.id;
            delete this.toUpdate['existingTitle'];
            fetch(`http://localhost:2000/api/Tasks/${taskID}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(this.toUpdate),
            })
              .then((res) => {
                console.log(res.json());
                this.updatedSuccessful = true;
                setTimeout(() => {
                  this.updatedSuccessful = false;
                }, 3000);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
