import { Meteor } from 'meteor/meteor';
import { loadInitialData } from './initial-data';
import { Communities } from '../collections/communities';
import { People } from '../collections/people';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // Publishing collections so I can subscribe in the client
  Meteor.publish('communities.all', () => Communities.find());
  Meteor.publish('people.all', () => People.find());
  // Allowing to update People collection
  People.allow({
    update() {
      return true;
    },
  });
});
