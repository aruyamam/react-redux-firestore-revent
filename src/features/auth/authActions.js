import { SubmissionError } from 'redux-form';
import { SIGN_OUT_USER } from './authConstants';
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

export const logout = () => ({
   type: SIGN_OUT_USER,
});
