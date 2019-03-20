const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const newActivity = (type, event, id) => ({
   type,
   eventDate: event.hostedBy,
   hostedBy: event.hostedBy,
   title: event.title,
   photoURL: event.hostPhotoURL,
   timestamp: admin.firestore.FieldValue.serverTimestamp(),
   hostUid: event.hostUid,
   eventId: id
});

exports.createActivity = functions.firestore
   .document('events/{eventId}')
   .onCreate(event => {
      const newEvent = event.data();

      console.log(newEvent);

      const activity = newActivity('newEvent', newEvent, event.id);

      console.log(activity);

      return admin
         .firestore()
         .collection('activity')
         .add(activity)
         .then(docRef => console.log('Activity created with ID: ', docRef.id))
         .catch(err => console.log('Error adding activity', err));
   });

exports.cancelActivity = functions.firestore
   .document('events/{eventId}')
   .onUpdate((event, context) => {
      const updatedEvent = event.after.data();
      const previousEventData = event.before.data();
      console.log({ event });
      console.log({ context });
      console.log({ updatedEvent });
      console.log({ previousEventData });

      if (
         !updatedEvent.cancelled ||
         updatedEvent.cancelled === previousEventData.cancelled
      ) {
         return false;
      }

      const activity = newActivity(
         'cancelledEvent',
         updatedEvent,
         context.params.eventId
      );

      console.log({ activity });

      return admin
         .firestore()
         .collection('activity')
         .add(activity)
         .then(docRef => console.log('Activity created with ID: ', docRef.id))
         .catch(err => console.log('Error adding activity', err));
   });

exports.userFollowing = functions.firestore
   .document('users/{followerUid}/following/{followingUid}')
   .onCreate((event, context) => {
      console.log('v1');
      const followerUid = context.params.followerUid;
      const followingUid = context.params.followingUid;

      const followerDoc = admin
         .firestore()
         .collection('users')
         .doc(followerUid);

      console.log(followerDoc);

      return followerDoc.get().then(doc => {
         let userData = doc.data();
         console.log({ userData });
         let follower = {
            displayName: userData.displayName,
            photoURL: userData.photoURL || '/assets/user.png',
            city: userData.city || 'Unknown City'
         };

         return admin
            .firestore()
            .collection('users')
            .doc(followingUid)
            .collection('followers')
            .doc(followerUid)
            .set(follower);
      });
   });

exports.unfollowUser = functions.firestore
   .document('users/{followerUid}/following/{followingUid}')
   .onDelete((event, context) => {
      return admin
         .firestore()
         .collection('users')
         .doc(context.params.followingUid)
         .collection('followers')
         .doc(context.params.followerUid)
         .delete()
         .then(() => console.log('doc deleted'))
         .catch(err => console.log(err));
   });
