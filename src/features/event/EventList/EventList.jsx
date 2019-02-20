import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventListItem from './EventListItem';

class EventList extends Component {
   state = {};

   render() {
      const { events, deleteEvent } = this.props;

      return (
         <div>
            {events
               && events.map(event => (
                  <EventListItem key={event.id} event={event} deleteEvent={deleteEvent} />
               ))}
         </div>
      );
   }
}

EventList.propTypes = {
   deleteEvent: PropTypes.func.isRequired,
   events: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string.isRequired,
      }),
   ).isRequired,
};

export default EventList;
