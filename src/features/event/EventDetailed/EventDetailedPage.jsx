import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';

const mapState = (state, ownProps) => {
   const eventId = ownProps.match.params.id;
   const { events } = state;

   let event = {};

   if (eventId && events.length > 0) {
      [event] = events.filter(event => event.id === eventId);
   }

   return { event };
};

const EventDetailed = ({ event }) => (
   <Grid>
      <Grid.Column width={10}>
         <EventDetailedHeader event={event} />
         <EventDetailedInfo event={event} />
         <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
         <EventDetailedSidebar attendees={event.attendees} />
      </Grid.Column>
   </Grid>
);

export default connect(mapState)(EventDetailed);
