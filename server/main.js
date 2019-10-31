import { Meteor } from 'meteor/meteor';
import { loadInitialData } from './initial-data';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();
});
