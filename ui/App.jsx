import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Communities } from '../collections/communities';
import { withTracker } from 'meteor/react-meteor-data';

class App extends Component {
  componentDidMount() {
    Communities.allow({
      insert() {
        return { name: 'Tralala' };
      },
    });
  }
  render() {
    console.log(this.props.CommunitiesArray);
    return <p>Tralala</p>;
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('communities');

  return {
    communitiesLoading: !handle.ready(),
    CommunitiesArray: Communities.find().fetch(),
  };
})(App);
