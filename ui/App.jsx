import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Communities } from '../collections/communities';
import { People } from '../collections/people';
import { withTracker } from 'meteor/react-meteor-data';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  displayingList(event, communityName) {
    const list = document.getElementsByClassName(`${communityName}`)[0];

    list.style.display === 'none'
      ? (list.style.display = 'block') && (list.style.height = '300px')
      : (list.style.display = 'none') && (list.style.height = '0px');

    event.target.className === 'btn btn-primary openButton'
      ? (event.target.className = 'btn btn-danger openButton')
      : (event.target.className = 'btn btn-primary openButton');

    event.target.innerText === 'Open'
      ? (event.target.innerText = 'Close')
      : (event.target.innerText = 'Open');
  }

  fullName(people) {
    return `${people.firstName} ${people.lastName}`;
  }

  checkInDateParse(people) {
    return people.checkInDate
      ? `Check-In: ${new Date(people.checkInDate).toLocaleString('en-US')}`
      : 'Check-In: N/A';
  }

  checkOutDateParse(people) {
    return people.checkOutDate
      ? `Check-Out: ${new Date(people.checkOutDate).toLocaleString('en-US')}`
      : 'Check-Out: N/A';
  }

  CheckInOut(_id) {
    const checked = People.findOne({ _id }).checked;

    checked
      ? People.update(
          { _id },
          {
            $set: { checked: !checked, checkOutDate: new Date() },
          }
        )
      : People.update(
          { _id },
          {
            $set: { checked: !checked, checkInDate: new Date() },
          }
        );
  }

  peopleCheckedIn(people, id) {
    const checkedInArray = people.filter(
      p => p.checked && p.communityId === id
    );
    return `People in the event right now: ${checkedInArray.length}`;
  }

  peopleCheckedInByCompany(people, id) {
    const companiesArray = people
      .filter(p => p.companyName && p.checked && p.communityId === id)
      .map(p => p.companyName);

    const result = {};

    for (let i = 0; i < companiesArray.length; i++) {
      result[companiesArray[i]] = (result[companiesArray[i]] || 0) + 1;
    }

    return Object.keys(result).map(key =>
      companiesArray.length > 0
        ? ` ${[key]} (${result[key]})`
        : `No one representing companies`
    );
  }

  peopleNotCheckedIn(people, id) {
    const checkedInArray = people.filter(
      p => !p.checked && p.communityId === id
    );
    return `People not checked-in: ${checkedInArray.length}`;
  }

  renderPeoples(communityName, communityId) {
    return (
      <div
        style={{
          height: '0px',
          display: 'none',
          overflow: 'auto',
        }}
        className={communityName}
      >
        {this.props.peoplesArray
          .filter(people => people.communityId === communityId)
          .map(people => (
            <div
              className="list-group peopleList"
              key={people._id}
              style={{ margin: '5px 50px' }}
            >
              <div className="list-group-item list-group-item-action flex-column align-items-center">
                <div className="d-flex w-100 justify-content-between">
                  <div className="d-flex w-100 align-items-center">
                    <h5 className="mb-1 mr-2">{this.fullName(people)}</h5>
                    <small className="mb-1">{people.title}</small>
                  </div>
                  <div className="d-flex flex-column w-100 align-items-center">
                    <small className="mb-1 mr-2">
                      {this.checkInDateParse(people)}
                    </small>
                    <small className="mb-1">
                      {this.checkOutDateParse(people)}
                    </small>
                  </div>
                  <button
                    onClick={() => this.CheckInOut(people._id)}
                    style={{ minWidth: '300px' }}
                    type="button"
                    className={
                      people.checked ? 'btn btn-danger' : 'btn btn-primary'
                    }
                  >
                    {people.checked
                      ? `Check-out ${this.fullName(people)}`
                      : `Check-in ${this.fullName(people)}`}
                  </button>
                </div>
                <p className="mb-1">{people.companyName}</p>
              </div>
            </div>
          ))}
      </div>
    );
  }

  render() {
    return this.props.loading ? (
      <div>
        {this.props.communitiesArray.length ? (
          this.props.communitiesArray.map(community => (
            <div
              className="list-group"
              key={community._id}
              style={{
                margin: '20px 100px',
                backgroundColor: '#eee',
              }}
            >
              <div className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{community.name}</h5>
                  <div className="d-flex flex-column">
                    <small>
                      {this.peopleCheckedIn(
                        this.props.peoplesArray,
                        community._id
                      )}
                    </small>
                    <small>
                      {`People by company in the event right now: ${this.peopleCheckedInByCompany(
                        this.props.peoplesArray,
                        community._id
                      )} `}
                    </small>
                    <small>
                      {this.peopleNotCheckedIn(
                        this.props.peoplesArray,
                        community._id
                      )}
                    </small>
                  </div>

                  <button
                    onClick={() => this.displayingList(event, community.name)}
                    type="button"
                    className="btn btn-primary openButton"
                  >
                    Open
                  </button>
                </div>
              </div>
              {this.renderPeoples(community.name, community._id)}
            </div>
          ))
        ) : (
          <div>OOOPSY: NO EVENTS REGISTERED</div>
        )}
      </div>
    ) : (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spin" />
      </div>
    );
  }
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('communities.all');
  const subscription2 = Meteor.subscribe('people.all');

  return {
    loading: subscription.ready() && subscription2.ready(),
    communitiesArray:
      subscription.ready() &&
      subscription2.ready() &&
      Communities.find().fetch(),
    peoplesArray:
      subscription.ready() && subscription2.ready() && People.find().fetch(),
  };
})(App);
