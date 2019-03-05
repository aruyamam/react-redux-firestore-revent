import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getUserEvents } from '../userActions';

const mapState = ({ auth, firestore, firebase }, { match: { params } }) => {
   let userUid = null;
   let profile = {};

   if (params.id === firebase.auth.uid) {
      profile = firebase.profile;
      userUid = params.id;
   }
   else {
      profile = !isEmpty(firestore.ordered.profile) ? firestore.ordered.profile[0] : {};
      userUid = params.id;
   }

   console.log(firestore.ordered);

   return {
      profile,
      userUid,
      auth: firebase.auth,
      photos: firestore.ordered.photos,
      requesting: firestore.status.requesting,
   };
};

const actions = {
   getUserEvents,
};

class UserDetailedPage extends Component {
   async componentDidMount() {
      const { getUserEvents, userUid } = this.props;
      const events = await getUserEvents(userUid);
      console.log(events);
   }

   render() {
      const {
         auth, match, photos, profile, requesting,
      } = this.props;

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
   }
}

UserDetailedPage.propTypes = {
   auth: PropTypes.shape({
      uid: PropTypes.string.isRequired,
   }).isRequired,
   getUserEvents: PropTypes.func.isRequired,
   match: PropTypes.shape({
      params: PropTypes.shape({
         id: PropTypes.string.isRequired,
      }).isRequired,
   }).isRequired,
   photos: PropTypes.arrayOf(PropTypes.object),
   profile: PropTypes.object.isRequired,
   requesting: PropTypes.object.isRequired,
};

export default compose(
   connect(mapState, actions),
   firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);
