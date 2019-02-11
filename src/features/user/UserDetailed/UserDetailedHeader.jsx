import React from 'react';
import differenceInYears from 'date-fns/difference_in_years';
import {
   Grid, Header, Item, Segment,
} from 'semantic-ui-react';

const UserDetailedHeader = ({ profile }) => {
   let age;
   if (profile.dateOfBirth) {
      age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
   }
   else {
      age = 'unknown age';
   }

   return (
      <Grid.Column width={16}>
         <Segment>
            <Item.Group>
               <Item>
                  <Item.Image avatar size="small" src={profile.photoURL || '/assets/user.png'} />
                  <Item.Content verticalAlign="bottom">
                     <Header as="h2">{profile.displayName}</Header>
                     <br />
                     <Header as="h3">{profile.occupation}</Header>
                     <br />
                     <Header as="h3">{`${age}, ${profile.city || 'unknown city'}`}</Header>
                  </Item.Content>
               </Item>
            </Item.Group>
         </Segment>
      </Grid.Column>
   );
};

export default UserDetailedHeader;
