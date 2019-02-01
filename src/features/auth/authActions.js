import { SubmissionError } from 'redux-form';
import { closeModal } from '../modals/modalActions';

export const login = creds => async (dispatch, getState, { getFirebase }) => {
   const firebase = getFirebase();
   try {
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
   }
   catch (error) {
      console.log(error);
      throw new SubmissionError({
         _error: error.message,
      });
   }
};

export const registerUser = user => async (dispatch, getState, { getFirebase, getFirestore }) => {
   const firebase = getFirebase();
   const firestore = getFirestore();

   try {
      // creat the user in auth
      const userCredentials = await firebase
         .auth()
         .createUserWithEmailAndPassword(user.email, user.password);
      console.log(userCredentials);

      // update the auth profile
      await userCredentials.user.updateProfile({
         displayName: user.displayName,
      });

      // create a new profile in firestore
      const newUser = {
         displayName: user.displayName,
         createdAt: firestore.FieldValue.serverTimestamp(),
      };
      await firestore.set(`users/${userCredentials.user.uid}`, { ...newUser });
      dispatch(closeModal());
   }
   catch (error) {
      console.log(error);
      throw new SubmissionError({
         _error: error.message,
      });
   }
};

export const socialLogin = selectedProvider => async (dispatch, getState, { getFirebase }) => {
   const firebase = getFirebase();
   try {
      dispatch(closeModal());
      await firebase.login({
         provider: selectedProvider,
         type: 'popup',
      });
   }
   catch (error) {
      console.log(error);
   }
};
