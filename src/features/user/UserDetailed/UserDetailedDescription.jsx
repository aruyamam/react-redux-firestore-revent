import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import {
   Grid, Header, Icon, Item, List, Segment,
} from 'semantic-ui-react';

const UserDetailedDescription = ({ profile }) => (
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
);

UserDetailedDescription.propTypes = {
   profile: PropTypes.shape({
      city: PropTypes.string,
      createdAt: PropTypes.object,
      displayName: PropTypes.string.isRequired,
      interests: PropTypes.arrayOf(PropTypes.string),
      occupation: PropTypes.string,
   }).isRequired,
};

export default UserDetailedDescription;
