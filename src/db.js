const dataBaseSample = {
  customers: {
    customerOne: {
      firstName: 'David',
      birthday: 12345,
      location: 'SF',
    },
    customerTwo: {
      firstName: 'Paul',
      birthday: 2345,
      location: 'NY',
    },
  },
};

import firebase from 'firebase';

const db = firebase.database();
const customers = db.ref().child('customers');
const primaryKey = 'customerOne';

const dataToStore = {
  firstName: 'David',
  birthday: 12345,
  location: 'SF',
};
customers.child(primaryKey).set(dataToStore);
customers.child(primaryKey).update(dataToStore);

const events = db.child('events/fm');
const attendees = db.child.child('eventAttendees/fm');

events.on('value', snap => {});

attendees.on('child_added', snap => {});
