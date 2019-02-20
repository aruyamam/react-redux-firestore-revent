import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const mapState = ({ firestore: { ordered }, async: { loading } }) => {
   const events = ordered.events && ordered.events.filter(event => !(event.id === 'undefined'));

   return {
      events,
      loading,
   };
};
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
            <Grid.Column width={6}>
               <EventActivity />
            </Grid.Column>
         </Grid>
      );
   }
}

EventDashboard.propTypes = {
   deleteEvent: PropTypes.func.isRequired,
   loading: PropTypes.bool.isRequired,
   events: PropTypes.arrayOf(PropTypes.object),
};

EventDashboard.defaultProps = {
   events: [],
};

export default connect(
   mapState,
   actions,
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
