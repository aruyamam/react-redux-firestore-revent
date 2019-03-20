import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

const PersonCard = ({ user }) => (
   <Card as={Link} to={`/profile/${user.id}`}>
      <Image src={user.photoURL} />
      <Card.Content textAlign="center">
         <Card.Header content={user.displayName} />
      </Card.Content>
      <Card.Meta textAlign="center">
         <span>{user.city}</span>
      </Card.Meta>
   </Card>
);

PersonCard.propTypes = {
   user: PropTypes.shape({
      city: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
   }).isRequired,
};

export default PersonCard;
