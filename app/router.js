import EmberRouter from '@ember/routing/router';
import config from 'emberjs-assignment/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('tasks');
  this.route('create-task', { path: '/' });
  this.route('update-task');
});
