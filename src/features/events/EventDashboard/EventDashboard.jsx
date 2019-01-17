import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';

const mapState = state => ({
   events: state.events,
});

const actions = {
   deleteEvent,
};

class EventDashboard extends Component {
   handleDeleteEvent = eventId => () => {
      this.props.deleteEvent(eventId);
   };

   render() {
      const { events } = this.props;

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventList deleteEvent={this.handleDeleteEvent} events={events} />
            </Grid.Column>
            <Grid.Column width={6} />
         </Grid>
      );
   }
}

EventDashboard.porpTypes = {
   createEvent: PropTypes.func.isRequired,
   updateEvent: PropTypes.func.isRequired,
   deleteEvent: PropTypes.func.isRequired,
};

export default connect(
   mapState,
   actions,
)(EventDashboard);
