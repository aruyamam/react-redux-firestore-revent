import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import userDetailedQuery from '../userQueries';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { followUser, getUserEvents, unfollowUser } from '../userActions';
import { requestingPropType } from '../../../app/common/util/helpers';

const mapState = ({
   auth, async, events, firestore, firebase,
}, { match: { params } }) => {
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
      const {
         firestore, history, getUserEvents, match, userUid,
      } = this.props;
      const user = await firestore.get(`users/${match.params.id}`);

      if (!user.exists) {
         toastr.error('Not Found', 'This is not the user you are looking for');
         history.push('/error');
      }

      await getUserEvents(userUid);
   }

   changeTab = (e, data) => {
      const { getUserEvents, userUid } = this.props;
      getUserEvents(userUid, data.activeIndex);
   };

   render() {
      const {
         auth,
         events,
         eventsLoading,
         followUser,
         following,
         match,
         photos,
         profile,
         requesting,
         unfollowUser,
      } = this.props;

      const isFollowing = !isEmpty(following);
      const isCurrentUser = auth.uid === match.params.id;
      const loading = requesting[`users/${match.params.id}`];

      if (loading) {
         return <LoadingComponent inverted />;
      }

      return (
         !isEmpty(profile) && (
            <Grid>
               <UserDetailedHeader profile={profile} />
               <UserDetailedDescription profile={profile} />
               <UserDetailedSidebar
                  followUser={followUser}
                  isFollowing={isFollowing}
                  isCurrentUser={isCurrentUser}
                  profile={profile}
                  unfollowUser={unfollowUser}
               />
               {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
               <UserDetailedEvents
                  changeTab={this.changeTab}
                  events={events}
                  eventsLoading={eventsLoading}
               />
            </Grid>
         )
      );
   }
}

UserDetailedPage.defaultProps = {
   following: [],
   photos: [],
   userUid: null,
};

UserDetailedPage.propTypes = {
   auth: PropTypes.shape({
      uid: PropTypes.string.isRequired,
   }).isRequired,
   events: PropTypes.arrayOf(PropTypes.object).isRequired,
   eventsLoading: PropTypes.bool.isRequired,
   firestore: PropTypes.shape({
      get: PropTypes.func.isRequired,
   }).isRequired,
   following: PropTypes.arrayOf(PropTypes.object),
   followUser: PropTypes.func.isRequired,
   getUserEvents: PropTypes.func.isRequired,
   history: PropTypes.shape({
      push: PropTypes.func.isRequired,
   }).isRequired,
   match: PropTypes.shape({
      params: PropTypes.shape({
         id: PropTypes.string.isRequired,
      }).isRequired,
   }).isRequired,
   photos: PropTypes.arrayOf(PropTypes.object),
   profile: PropTypes.shape({
      createdAt: PropTypes.object,
      displayName: PropTypes.string,
      gender: PropTypes.string,
      isEmpty: PropTypes.bool,
      isLoaded: PropTypes.bool,
      photoURL: PropTypes.string,
   }).isRequired,
   requesting: requestingPropType.isRequired,
   userUid: PropTypes.string,
   unfollowUser: PropTypes.func.isRequired,
};

export default compose(
   connect(
      mapState,
      actions,
   ),
   firestoreConnect((auth, userUid, match) => userDetailedQuery(auth, userUid, match)),
)(UserDetailedPage);
