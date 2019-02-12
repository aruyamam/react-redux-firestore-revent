import React from 'react';
import {
   Grid, Header, Image, Segment,
} from 'semantic-ui-react';

const UserDetailedPhotos = ({ photos }) => (
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
);

export default UserDetailedPhotos;
