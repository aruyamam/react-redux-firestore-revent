import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
   Card,
   Grid,
   Header,
   Image,
   Menu,
   Segment,
} from 'semantic-ui-react';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedPhotos from './UserDetailedPhotos';

const mapState = state => ({
   auth: state.firebase.auth,
   profile: state.firebase.profile,
   photos: state.firestore.ordered.photos,
});

const query = ({ auth }) => [
   {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos',
   },
];

const UserDetailedPage = ({ profile, photos }) => !profile.isEmpty && (
   <Grid>
      <UserDetailedHeader profile={profile} />
      <UserDetailedDescription profile={profile} />
      <UserDetailedSidebar />
      {photos && photos.length > 0 && (
         <UserDetailedPhotos photos={photos} />
      )}
      <Grid.Column width={12}>
         <Segment attached>
            <Header content="Events" icon="calendar outline" />
            <Menu secondary pointing>
               <Menu.Item active name="All Events" />
               <Menu.Item name="Past Events" />
               <Menu.Item name="Future Events" />
               <Menu.Item name="Events Hosted" />
            </Menu>
            <Card.Group itemsPerRow={5}>
               <Card>
                  <Image src="/assets/categoryImages/drinks.jpg" />
                  <Card.Content>
                     <Card.Header textAlign="center">Event Title</Card.Header>
                     <Card.Meta textAlign="center">28th March 2018 at 10:00 PM</Card.Meta>
                  </Card.Content>
               </Card>
               <Card>
                  <Image src="/assets/categoryImages/drinks.jpg" />
                  <Card.Content>
                     <Card.Header textAlign="center">Event Title</Card.Header>
                     <Card.Meta textAlign="center">28th March 2018 at 10:00 PM</Card.Meta>
                  </Card.Content>
               </Card>
            </Card.Group>
         </Segment>
      </Grid.Column>
   </Grid>
);

export default compose(
   connect(mapState),
   firestoreConnect(auth => query(auth)),
)(UserDetailedPage);
