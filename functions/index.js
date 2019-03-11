const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.createActivity = functions.firestore
   .document('events/{eventId}')
   .onCreate(event => {
      const newEvent = event.data();

      console.log(newEvent);

      const activity = {
         type: 'newEvenet',
         eventDate: newEvent.hostedBy,
         hostedBy: newEvent.hostedBy,
         title: newEvent.title,
         photoURL: newEvent.hostPhotoURL,
         timestamp: admin.firestore.FieldValue.serverTimestamp(),
         eventId: event.id
      };

      console.log(activity);

      return admin
         .firestore()
         .collection('activity')
         .add(activity)
         .then(docRef => console.log('Activity created with ID: ', docRef.id))
         .catch(err => console.log('Error adding activity', err));
   });
