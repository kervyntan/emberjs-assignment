import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class TaskListComponent extends Component {
  @tracked listOfTasks = [];

  get isListEmpty() {
    return this.listOfTasks.length == 0;
  }

  @action
  fetchTasks() {
    fetch('http://localhost:2000/api/Tasks')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.listOfTasks = data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
