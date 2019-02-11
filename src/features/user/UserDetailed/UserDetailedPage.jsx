import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { firestoreConnect } from 'react-redux-firebase';
import {
   Button,
   Card,
   Grid,
   Header,
   Icon,
   Image,
   Item,
   List,
   Menu,
   Segment,
} from 'semantic-ui-react';
import UserDetailedHeader from './UserDetailedHeader';

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

const UserDetailedPage = ({ profile, photos, history }) => (
   !profile.isEmpty && (
      <Grid>
         <UserDetailedHeader profile={profile} />
         <Grid.Column width={12}>
            <Segment>
               <Grid columns={2}>
                  <Grid.Column width={10}>
                     <Header content={`About ${profile.displayName}`} icon="smile outline" />
                     <p>
                           I am a:
                        {' '}
                        <strong>{profile.occupation || 'tbn'}</strong>
                     </p>
                     <p>
                           Originally from
                        {' '}
                        <strong>{profile.city || 'tbn'}</strong>
                     </p>
                     <p>
                           Member Since:
                        {' '}
                        <strong>{format(profile.createdAt.toDate(), 'D MMMM YYYY')}</strong>
                     </p>
                  </Grid.Column>
                  <Grid.Column width={6}>
                     <Header content="Interests" icon="heart outline" />
                     <List>
                        {profile.interests ? (
                           profile.interests
                              && profile.interests.map(interest => (
                                 <Item key={interest}>
                                    <Icon name="heart" />
                                    <Item.Content>{interest}</Item.Content>
                                 </Item>
                              ))
                        ) : (
                           <p>No Interests</p>
                        )}
                     </List>
                  </Grid.Column>
               </Grid>
            </Segment>
         </Grid.Column>
         <Grid.Column width={4}>
            <Segment>
               <Button
                  onClick={() => {
                     history.push('/settings/basic');
                  }}
                  basic
                  color="teal"
                  content="Edit Profile"
                  fluid
               />
            </Segment>
         </Grid.Column>
         {photos.length > 0 && (
            <Grid.Column width={12}>
               <Segment attached>
                  <Header content="Photos" icon="image outline" />
                  <Image.Group size="small">
                     {photos.map(photo => (
                        <Image key={photo.id} src={photo.url} />
                     ))}
                  </Image.Group>
               </Segment>
            </Grid.Column>
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
   )
);

export default compose(
   connect(mapState),
   firestoreConnect(auth => query(auth)),
)(UserDetailedPage);
