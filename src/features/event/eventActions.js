import { toastr } from 'react-redux-toastr';
import { UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants';
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

export const updateEvent = event => async (dispatch) => {
   try {
      dispatch({
         type: UPDATE_EVENT,
         payload: {
            event,
         },
      });
      toastr.success('Success', 'Event has been updated');
   }
   catch (error) {
      toastr.error('Oops', 'Somethign went wrong');
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
