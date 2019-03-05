import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import {
   Card, Grid, Header, Image, Menu, Segment,
} from 'semantic-ui-react';

const UserDetailedEvents = ({ events, eventsLoading }) => (
   <Grid.Column width={12}>
      <Segment attached loading={eventsLoading}>
         <Header content="Events" icon="calendar outline" />
         <Menu secondary pointing>
            <Menu.Item active name="All Events" />
            <Menu.Item name="Past Events" />
            <Menu.Item name="Future Events" />
            <Menu.Item name="Events Hosted" />
         </Menu>
         <Card.Group itemsPerRow={5}>
            {events
               && events.map(event => (
                  <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                     <Image src={`/assets/categoryImages/${event.category}.jpg`} />
                     <Card.Content>
                        <Card.Header textAlign="center">{event.title}</Card.Header>
                        <Card.Meta textAlign="center">
                           <div>{format(event.date && event.date.toDate(), 'DD MMM YYYY')}</div>
                           <div>{format(event.date && event.date.toDate(), 'h:mm A')}</div>
                        </Card.Meta>
                     </Card.Content>
                  </Card>
               ))}
         </Card.Group>
      </Segment>
   </Grid.Column>
);

UserDetailedEvents.propTypes = {
   events: PropTypes.arrayOf(
      PropTypes.shape({
         category: PropTypes.string,
         date: PropTypes.object,
         id: PropTypes.string,
         title: PropTypes.string,
      }),
   ).isRequired,
   eventsLoading: PropTypes.bool.isRequired,
};

export default UserDetailedEvents;
