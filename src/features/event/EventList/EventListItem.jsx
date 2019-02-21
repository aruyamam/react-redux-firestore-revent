import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import {
   Segment, Item, Icon, Label, List, Button,
} from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
   state = {};

   render() {
      const { event, deleteEvent } = this.props;

      return (
         <Segment.Group>
            <Segment>
               <Item.Group>
                  <Item>
                     <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                     <Item.Content>
                        <Item.Header as="a">{event.title}</Item.Header>
                        <Item.Description>
                           Hosted by
                           {' '}
                           <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
                        </Item.Description>
                        {event.cancelled && (
                           <Label
                              color="red"
                              content="This event has been cancelled"
                              style={{ top: '-40px' }}
                              ribbon="right"
                           />
                        )}
                     </Item.Content>
                  </Item>
               </Item.Group>
            </Segment>
            <Segment>
               <span>
                  <Icon name="clock" />
                  {` ${format(event.date.toDate(), 'dddd Do MMMM')} at ${format(
                     event.date.toDate(),
                     'HH:mm',
                  )} |`}
                  <Icon name="marker" />
                  {` ${event.venue}`}
               </span>
            </Segment>
            <Segment secondary>
               <List horizontal>
                  {event.attendees
                     && Object.values(event.attendees).map(attendee => (
                        <EventListAttendee
                           key={attendee.displayName + attendee.joinDate}
                           attendee={attendee}
                        />
                     ))}
               </List>
            </Segment>
            <Segment clearing>
               <span>{event.description}</span>
               <Button
                  onClick={deleteEvent(event.id)}
                  as="a"
                  color="red"
                  floated="right"
                  content="Delete"
               />
               <Button
                  as={Link}
                  to={`/event/${event.id}`}
                  color="teal"
                  floated="right"
                  content="view"
               />
            </Segment>
         </Segment.Group>
      );
   }
}

EventListItem.propTypes = {
   deleteEvent: PropTypes.func.isRequired,
   event: PropTypes.shape({
      attendees: PropTypes.object.isRequired,
      date: PropTypes.object.isRequired,
      description: PropTypes.string.isRequired,
      hostedBy: PropTypes.string.isRequired,
      hostUid: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      venue: PropTypes.string.isRequired,
   }).isRequired,
};

export default EventListItem;
