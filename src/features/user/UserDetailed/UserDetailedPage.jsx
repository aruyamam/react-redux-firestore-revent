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
import { followUser, getUserEvents, unfollowUser } from '../userActions';

const mapState = ({ auth, async, events, firestore, firebase }, { match: { params } }) => {
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
      events,
      eventsLoading: async.loading,
      auth: firebase.auth,
      following: firestore.ordered.following,
      photos: firestore.ordered.photos,
      requesting: firestore.status.requesting,
   };
};

const actions = {
   followUser,
   getUserEvents,
   unfollowUser,
};

class UserDetailedPage extends Component {
   async componentDidMount() {
      const { getUserEvents, userUid } = this.props;
      await getUserEvents(userUid);
   }

   changeTab = (e, data) => {
      const { getUserEvents, userUid } = this.props;
      getUserEvents(userUid, data.activeIndex);
   }

   render() {
      const {
         auth, events, eventsLoading, followUser, following, match, photos, profile, requesting, unfollowUser,
      } = this.props;

      const isFollowing = !isEmpty(following);
      const isCurrentUser = auth.uid === match.params.id;
      const loading = Object.values(requesting).some(a => a === true);

      if (loading) {
         return <LoadingComponent inverted />;
      }

      return !isEmpty(profile) && (
         <Grid>
            <UserDetailedHeader profile={profile} />
            <UserDetailedDescription profile={profile} />
            <UserDetailedSidebar followUser={followUser} isFollowing={isFollowing} isCurrentUser={isCurrentUser} profile={profile} unfollowUser={unfollowUser} />
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
   following: PropTypes.arrayOf(PropTypes.object).isRequired,
   followUser: PropTypes.func.isRequired,
   getUserEvents: PropTypes.func.isRequired,
   match: PropTypes.shape({
      params: PropTypes.shape({
         id: PropTypes.string.isRequired,
      }).isRequired,
   }).isRequired,
   photos: PropTypes.arrayOf(PropTypes.object),
   profile: PropTypes.object.isRequired,
   requesting: PropTypes.object.isRequired,
   userUid: PropTypes.string,
   unfollowUser: PropTypes.func.isRequired,
};

export default compose(
   connect(mapState, actions),
   firestoreConnect((auth, userUid, match) => userDetailedQuery(auth, userUid, match)),
)(UserDetailedPage);
