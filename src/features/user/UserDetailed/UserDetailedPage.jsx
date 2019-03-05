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

const mapState = ({ auth, async, events, firestore, firebase }, { match: { params } }) => {
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

   return {
      profile,
      userUid,
      events,
      eventsLoading: async.loading,
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

   changeTab = (e, data) => {
      const { getUserEvents, userUid } = this.props;
      getUserEvents(userUid, data.activeIndex);
   }

   render() {
      const {
         auth, events, eventsLoading, match, photos, profile, requesting,
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
            <UserDetailedEvents
               changeTab={this.changeTab}
               events={events}
               eventsLoading={eventsLoading}
            />
         </Grid>
      );
   }
}

UserDetailedPage.defaultProps = {
   photos: [],
};

UserDetailedPage.propTypes = {
   auth: PropTypes.shape({
      uid: PropTypes.string.isRequired,
   }).isRequired,
   events: PropTypes.arrayOf(PropTypes.object).isRequired,
   eventsLoading: PropTypes.bool.isRequired,
   getUserEvents: PropTypes.func.isRequired,
   match: PropTypes.shape({
      params: PropTypes.shape({
         id: PropTypes.string.isRequired,
      }).isRequired,
   }).isRequired,
   photos: PropTypes.arrayOf(PropTypes.object),
   profile: PropTypes.object.isRequired,
   requesting: PropTypes.object.isRequired,
   userUid: PropTypes.string.isRequired,
};

export default compose(
   connect(mapState, actions),
   firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);
