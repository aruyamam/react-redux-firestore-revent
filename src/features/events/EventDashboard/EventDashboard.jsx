import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const mapState = state => ({
   events: state.events,
   loading: state.async.loading,
});

const actions = {
   deleteEvent,
};

class EventDashboard extends Component {
   handleDeleteEvent = eventId => () => {
      this.props.deleteEvent(eventId);
   };

   render() {
      const { events, loading } = this.props;

      if (loading) {
         return <LoadingComponent inverted />;
      }

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
   loading: PropTypes.bool.isRequired,
   events: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
   mapState,
   actions,
)(EventDashboard);
