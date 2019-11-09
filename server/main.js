import { Meteor } from 'meteor/meteor';
import { loadInitialData } from './initial-data';
import { Communities } from '../collections/communities';
import { People } from '../collections/people';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  Meteor.publish('communities.all', () => Communities.find());
  Meteor.publish('people.all', () => People.find());
  People.allow({
    update() {
      return true;
    },
  });
});
