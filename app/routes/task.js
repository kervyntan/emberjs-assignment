import Route from '@ember/routing/route';

export default class FavouritePostsRoute extends Route {
  model() {
    console.log('The model hook just ran!');
    return 'Hello Ember!';
  }
}
