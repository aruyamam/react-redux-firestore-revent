import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Loader } from 'semantic-ui-react';
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
   state = {
      moreEvents: false,
      loadingInitial: true,
      loadedEvents: [],
   };

   async componentDidMount() {
      const next = await this.props.getEventsForDashboard();
      console.log(next);

      if (next && next.docs && next.docs.length > 1) {
         this.setState({
            moreEvents: true,
            loadingInitial: false,
         });
      }
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.events !== nextProps.events) {
         this.setState({
            loadedEvents: [...this.state.loadedEvents, ...nextProps.events],
         });
      }
   }

   getNextEvents = async () => {
      const { events, getEventsForDashboard } = this.props;
      const lastEvent = events && events[events.length - 1];
      // console.log(lastEvent);
      const next = await getEventsForDashboard(lastEvent);
      console.log(next);

      if (next && next.docs && next.docs.length <= 1) {
         this.setState({ moreEvents: false });
      }
   };

   render() {
      const { loading } = this.props;
      const { loadedEvents, loadingInitial, moreEvents } = this.state;

      if (loadingInitial) {
         return <LoadingComponent inverted />;
      }

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventList
                  events={loadedEvents}
                  getNextEvents={this.getNextEvents}
                  loading={loading}
                  moreEvents={moreEvents}
               />
            </Grid.Column>
            <Grid.Column width={6}>
               <EventActivity />
            </Grid.Column>
            <Grid.Column width={10}>
               <Loader active={loading} />
            </Grid.Column>
         </Grid>
      );
   }
}

EventDashboard.propTypes = {
   events: PropTypes.arrayOf(PropTypes.object),
   getEventsForDashboard: PropTypes.func.isRequired,
   loading: PropTypes.bool.isRequired,
};

EventDashboard.defaultProps = {
   events: [],
};

export default connect(
   mapState,
   actions,
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
