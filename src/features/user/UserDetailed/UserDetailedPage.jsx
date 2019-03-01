import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import userDetailedQuery from '../userQueries';
import LoadingComponent from '../../../app/layout/LoadingComponent'

const mapState = ({ auth, firestore, firebase }, { match: { params } }) => {
   let userUid = null;
   let profile = {};

   if (params.id === firebase.auth.uid) {
      profile = firebase.profile;
   }
   else {
      profile = !isEmpty(firestore.ordered.profile) ? firestore.ordered.profile[0] : {};
      userUid = params.id;
   }

   return {
      profile,
      userUid,
      auth: firebase.auth,
      photos: firestore.ordered.photos,
      requesting: firestore.status.requesting,
   };
};

const UserDetailedPage = ({
   auth, match, profile, photos, requesting,
}) => {
   const isCurrentUser = auth.uid === match.params.id;
   const loading = Object.values(requesting).some(a => a === true);

   if (loading) {
      return <LoadingComponent inverted />;
   }

   return !isEmpty(profile) && (
      <Grid>
         <UserDetailedHeader profile={profile} />
         <UserDetailedDescription profile={profile} />
         <UserDetailedSidebar isCurrentUser={isCurrentUser} />
         {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
         <UserDetailedEvents />
      </Grid>
   );
};

export default compose(
   connect(mapState),
   firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);
