import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { getEventsForDashboard } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const mapState = ({ events, async: { loading } }) => ({
   events,
   loading,
});
const actions = {
   getEventsForDashboard,
};

class EventDashboard extends Component {
   componentDidMount() {
      this.props.getEventsForDashboard();
   }

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
   events: PropTypes.arrayOf(PropTypes.object),
   loading: PropTypes.bool.isRequired,
};

EventDashboard.defaultProps = {
   events: [],
};

export default connect(
   mapState,
   actions,
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
