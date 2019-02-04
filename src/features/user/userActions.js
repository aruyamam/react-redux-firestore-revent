import moment from 'moment';
import { toastr } from 'react-redux-toastr';

const updateProfile = user => async (dispactch, getState, { getFirebase }) => {
   const firebase = getFirebase();
   if (user.dateOfBirth) {
      user.dateOfBirth = moment(user.dateOfBirth).toDate();
   }

   try {
      await firebase.updateProfile(user);
      toastr.success('Success', 'Profile updated');
   }
   catch (error) {
      console.log(error);
   }
};

export default updateProfile;
