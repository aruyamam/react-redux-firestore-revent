import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectToArray } from '../../../app/common/util/helpers';
import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';

const mapState = ({
   firebase: { auth },
   firestore: {
      ordered: { events },
   },
}) => {
   let event = {};

   if (events && events[0]) {
      [event] = events;
   }

   return { event, auth };
};

const actions = {
   goingToEvent,
   cancelGoingToEvent,
};

class EventDetailedPage extends Component {
   async componentDidMount() {
      const { firestore, match } = this.props;
      await firestore.setListener(`events/${match.params.id}`);
   }

   async componentWillUnmount() {
      const { firestore, match } = this.props;
      await firestore.unsetListener(`events/${match.params.id}`);
   }

   render() {
      const {
         auth, cancelGoingToEvent, event, goingToEvent,
      } = this.props;
      const attendees = event && event.attendees && objectToArray(event.attendees);
      const isHost = event.hostUid === auth.uid;
      const isGoing = attendees && attendees.some(a => a.id === auth.uid);

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventDetailedHeader
                  event={event}
                  isHost={isHost}
                  isGoing={isGoing}
                  cancelGoingToEvent={cancelGoingToEvent}
                  goingToEvent={goingToEvent}
               />
               <EventDetailedInfo event={event} />
               <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
               <EventDetailedSidebar attendees={attendees} />
            </Grid.Column>
         </Grid>
      );
   }
}

EventDetailedPage.propTypes = {
   auth: PropTypes.shape({
      uid: PropTypes.string,
   }).isRequired,
   event: PropTypes.shape({
      attendees: PropTypes.object,
   }).isRequired,
};

export default withFirestore(
   connect(
      mapState,
      actions,
   )(EventDetailedPage),
);
