import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
   Card, Grid, Header, Segment,
} from 'semantic-ui-react';
import PersonCard from './PersonCard';

const query = ({ auth }) => [
   {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'following' }],
      storeAs: 'following',
   },
   {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'followers' }],
      storeAs: 'followers',
   },
];

const mapStates = ({ firebase, firestore }) => ({
   auth: firebase.auth,
   followers: firestore.ordered.followers,
   followings: firestore.ordered.following,
});

const PeopleDashboard = ({ followers, followings }) => (
   <Grid>
      <Grid.Column width={16}>
         <Segment>
            <Header dividing content="People following me" />
            <Card.Group itemsPerRow={8} stackable>
               {followers.map(follower => (
                  <PersonCard key={follower.id} user={follower} />
               ))}
            </Card.Group>
         </Segment>
         <Segment>
            <Header dividing content="People I'm following" />
            <Card.Group itemsPerRow={8} stackable>
               {followings.map(following => (
                  <PersonCard key={following.id} user={following} />
               ))}
            </Card.Group>
         </Segment>
      </Grid.Column>
   </Grid>
);

PeopleDashboard.defaultProps = {
   followers: [],
   followings: [],
};

PeopleDashboard.propTypes = {
   followers: PropTypes.arrayOf(PropTypes.object),
   followings: PropTypes.arrayOf(PropTypes.object),
};

export default compose(
   connect(mapStates),
   firestoreConnect(props => query(props)),
)(PeopleDashboard);
