import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import { DELETE_EVENT, FETCH_EVENTS } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import fetchSampleData from '../../app/data/mockApi';
import { createNewEvent } from '../../app/common/util/helpers';

export const fetchEvents = events => ({
   type: FETCH_EVENTS,
   payload: events,
});

export const createEvent = event => async (dispatch, getState, { getFirestore, getFirebase }) => {
   const firestore = getFirestore();
   const firebase = getFirebase();
   const user = firebase.auth().currentUser;
   const { photoURL } = getState().firebase.profile;
   const newEvent = createNewEvent(user, photoURL, event);

   try {
      const createdEvent = await firestore.add('events', newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
         eventId: createdEvent.id,
         userUid: user.uid,
         eventDate: event.date,
         host: true,
      });
      toastr.success('Success', 'Event has been created');
   }
   catch (error) {
      toastr.error('Oops', 'Somethign went wrong');
   }
};

export const updateEvent = event => async (dispatch, getState, { getFirestore }) => {
   const firestore = getFirestore();

   if (event.date !== getState().firestore.ordered.events[0].date) {
      event.date = moment(event.date).toDate();
   }

   try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success('Success', 'Event has been updated');
   }
   catch (error) {
      toastr.error('Oops', 'Somethign went wrong');
   }
};

export const cancelToggle = (cancelled, eventId) => async (
   dispatch,
   getState,
   { getFirestore },
) => {
   const firestore = getFirestore();
   const message = cancelled
      ? 'Are you sure you want to cancel the event?'
      : 'This will reactivate the event - are you sure?';

   try {
      toastr.confirm(message, {
         onOk: () => firestore.update(`events/${eventId}`, {
            cancelled,
         }),
      });
   }
   catch (error) {
      console.log(error);
   }
};

export const deleteEvent = eventId => ({
   type: DELETE_EVENT,
   payload: {
      eventId,
   },
});

export const loadEvent = () => async (dispatch) => {
   try {
      dispatch(asyncActionStart());
      const events = await fetchSampleData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
   }
   catch (error) {
      console.log(error);
      dispatch(asyncActionError());
   }
};
