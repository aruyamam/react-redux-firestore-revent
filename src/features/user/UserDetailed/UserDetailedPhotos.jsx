import React from 'react';
import PropTypes from 'prop-types';
import {
   Grid, Header, Image, Segment,
} from 'semantic-ui-react';
import Lazyload from 'react-lazyload';

const UserDetailedPhotos = ({ photos }) => (
   <Grid.Column width={12}>
      <Segment attached>
         <Header content="Photos" icon="image outline" />
         <Image.Group size="small">
            {photos.map(photo => (
               <Lazyload key={photo.id} height={150} placeholder={<Image src="/assets/user.png" />}>
                  <Image src={photo.url} />
               </Lazyload>
            ))}
         </Image.Group>
      </Segment>
   </Grid.Column>
);

UserDetailedPhotos.propTypes = {
   photos: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string,
         url: PropTypes.string,
      }),
   ).isRequired,
};

export default UserDetailedPhotos;
