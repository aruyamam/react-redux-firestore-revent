import React from 'react';
import PropTypes from 'prop-types';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const EventListAttendee = ({ attendee }) => (
   <List.Item>
      <Image
         as={Link}
         to={`/profile/${attendee.id}`}
         size="mini"
         circular
         src={attendee.photoURL}
      />
   </List.Item>
);

EventListAttendee.propTypes = {
   attendee: PropTypes.shape({
      id: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
   }).isRequired,
};

export default EventListAttendee;
