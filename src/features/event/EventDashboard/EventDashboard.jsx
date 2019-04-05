import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Loader } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { getEventsForDashboard } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const query = [
   {
      collection: 'activity',
      orderBy: ['timestamp', 'desc'],
      limit: 5,
   },
];

const mapState = ({ events, async: { loading }, firestore }) => ({
   events,
   loading,
   activities: firestore.ordered.activity,
});
const actions = {
   getEventsForDashboard,
};

class EventDashboard extends Component {
   state = {
      moreEvents: false,
      loadingInitial: true,
      loadedEvents: [],
      contextRef: {},
   };

   async componentDidMount() {
      const { getEventsForDashboard } = this.props;
      const next = await getEventsForDashboard();

      if (next && next.docs && next.docs.length > 1) {
         this.setState({
            moreEvents: true,
            loadingInitial: false,
         });
      }
   }

   componentWillReceiveProps(nextProps) {
      const { events } = this.props;
      const { loadedEvents } = this.state;

      if (events !== nextProps.events) {
         this.setState({
            loadedEvents: [...loadedEvents, ...nextProps.events],
         });
      }
   }

   getNextEvents = async () => {
      const { events, getEventsForDashboard } = this.props;
      const lastEvent = events && events[events.length - 1];
      const next = await getEventsForDashboard(lastEvent);

      if (next && next.docs && next.docs.length <= 1) {
         this.setState({ moreEvents: false });
      }
   };

   handleContextRef = contextRef => this.setState({ contextRef });

   render() {
      const { activities, loading } = this.props;
      const {
         contextRef, loadedEvents, loadingInitial, moreEvents,
      } = this.state;

      if (loadingInitial) {
         return <LoadingComponent inverted />;
      }

      return (
         <Grid>
            <Grid.Column width={10}>
               <div ref={this.handleContextRef}>
                  <EventList
                     events={loadedEvents}
                     getNextEvents={this.getNextEvents}
                     loading={loading}
                     moreEvents={moreEvents}
                  />
               </div>
            </Grid.Column>
            <Grid.Column width={6} style={{ zIndex: 0 }}>
               <EventActivity activities={activities} contextRef={contextRef} />
            </Grid.Column>
            <Grid.Column width={10}>
               <Loader active={loading} />
            </Grid.Column>
         </Grid>
      );
   }
}

EventDashboard.propTypes = {
   activities: PropTypes.arrayOf(PropTypes.object),
   events: PropTypes.arrayOf(PropTypes.object),
   getEventsForDashboard: PropTypes.func.isRequired,
   loading: PropTypes.bool.isRequired,
};

EventDashboard.defaultProps = {
   activities: [],
   events: [],
};

export default connect(
   mapState,
   actions,
)(firestoreConnect(query)(EventDashboard));
