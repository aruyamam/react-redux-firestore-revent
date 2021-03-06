import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import {
   Button, Header, Image, Item, Label, Segment,
} from 'semantic-ui-react';

const eventImageStyle = {
   filter: 'brightness(30%)',
};

const eventImageTextStyle = {
   position: 'absolute',
   bottom: '5%',
   left: '5%',
   width: '100%',
   height: 'auto',
   color: 'white',
};

const EventDetailedHeader = ({
   authenticated,
   cancelGoingToEvent,
   event,
   isHost,
   isGoing,
   goingToEvent,
   loading,
   openModal,
}) => {
   let eventDate;
   if (event.date) {
      eventDate = event.date.toDate();
   }

   return (
      <Segment.Group>
         <Segment basic attached="top" style={{ padding: '0' }}>
            <Image
               src={`/assets/categoryImages/${event.category}.jpg`}
               fluid
               style={eventImageStyle}
            />
            <Segment basic style={eventImageTextStyle}>
               <Item.Group>
                  <Item>
                     <Item.Content>
                        <Header size="huge" content={event.title} style={{ color: 'white' }} />
                        <p>{format(eventDate, 'dddd Do MMMM')}</p>
                        <p>
                           Hosted by
                           {' '}
                           <strong>{event.hostedBy}</strong>
                        </p>
                     </Item.Content>
                  </Item>
               </Item.Group>
            </Segment>
         </Segment>
         <Segment attached="bottom" clearing>
            {!isHost && (
               <Fragment>
                  {isGoing && !event.cancelled && (
                     <Button onClick={() => cancelGoingToEvent(event)}>Cancel My Place</Button>
                  )}

                  {!isGoing && authenticated && !event.cancelled && (
                     <Button loading={loading} onClick={() => goingToEvent(event)} color="teal">
                        JOIN THIS EVENT
                     </Button>
                  )}

                  {!authenticated && !event.cancelled && (
                     <Button
                        loading={loading}
                        onClick={() => openModal('UnauthModal')}
                        color="teal"
                     >
                        JOIN THIS EVENT
                     </Button>
                  )}
                  {event.cancelled && !isHost && (
                     <Label content="This event has been cancelled" color="red" size="large" />
                  )}
               </Fragment>
            )}

            {isHost && (
               <Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">
                  Manage Event
               </Button>
            )}
         </Segment>
      </Segment.Group>
   );
};

EventDetailedHeader.propTypes = {
   authenticated: PropTypes.bool.isRequired,
   cancelGoingToEvent: PropTypes.func.isRequired,
   event: PropTypes.shape({
      category: PropTypes.string,
      date: PropTypes.object,
      hostedBy: PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.string,
   }).isRequired,
   isHost: PropTypes.bool.isRequired,
   isGoing: PropTypes.bool,
   goingToEvent: PropTypes.func.isRequired,
   loading: PropTypes.bool.isRequired,
   openModal: PropTypes.func.isRequired,
};

EventDetailedHeader.defaultProps = {
   isGoing: false,
};

export default EventDetailedHeader;
