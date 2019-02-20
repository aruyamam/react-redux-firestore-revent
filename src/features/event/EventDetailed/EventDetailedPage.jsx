import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectToArray } from '../../../app/common/util/helpers';

const mapState = (
   {
      firebase: { auth },
      firestore: {
         ordered: { events },
      },
   },
   { match: { params } },
) => {
   let event = {};

   if (events && events[0]) {
      [event] = events.filter(event => event.id === params.id);
   }

   return { event, auth };
};

class EventDetailedPage extends Component {
   async componentDidMount() {
      const { firestore, match, history } = this.props;
      const event = await firestore.get(`events/${match.params.id}`);
      if (!event.exists) {
         history.push('/events');
         toastr.error('Sorry', 'Event not found');
      }
   }

   render() {
      const { auth, event } = this.props;
      const attendees = event && event.attendees && objectToArray(event.attendees);
      const isHost = event.hostUid === auth.uid;
      const isGoing = attendees && attendees.some(a => a.id === auth.uid);

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventDetailedHeader event={event} isHost={isHost} isGoing={isGoing} />
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

export default withFirestore(connect(mapState)(EventDetailedPage));
