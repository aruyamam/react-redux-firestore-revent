import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, isEmpty, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { createDataTree, objectToArray, requestingPropType } from '../../../app/common/util/helpers';
import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';
import { addEventComment } from '../eventActions';
import { openModal } from '../../modals/modalActions';

const mapState = (
   {
      async: { loading },
      firebase: { auth, data },
      firestore: {
         ordered: { events },
         status: { requesting },
      },
   },
   { match: { params } },
) => {
   let event = {};

   if (events && events[0]) {
      [event] = events;
   }

   if (requesting[`events/${params.id}`] === undefined) {
      requesting[`events/${params.id}`] = true;
   }

   return {
      auth,
      event,
      eventChat: isEmpty(data.event_chat) ? [] : objectToArray(data.event_chat[params.id]),
      loading,
      requesting,
   };
};

const actions = {
   addEventComment,
   cancelGoingToEvent,
   goingToEvent,
   openModal,
};

class EventDetailedPage extends Component {
   state = {
      initialLoading: true,
   };

   async componentDidMount() {
      const { firestore, history, match } = this.props;
      const event = await firestore.get(`events/${match.params.id}`);

      if (!event.exists) {
         toastr.error('Not found', 'This is not the event your are looking for');
         history.push('/error');
      }

      await firestore.setListener(`events/${match.params.id}`);
      this.setState({ initialLoading: false });
   }

   async componentWillUnmount() {
      const { firestore, match } = this.props;
      await firestore.unsetListener(`events/${match.params.id}`);
   }

   render() {
      const {
         addEventComment,
         auth,
         cancelGoingToEvent,
         event,
         goingToEvent,
         loading,
         match,
         openModal,
         requesting,
      } = this.props;
      const { initialLoading } = this.state;
      let { eventChat } = this.props;
      const attendees = event && event.attendees && objectToArray(event.attendees).sort((a, b) => a.joinDate - b.joinDate);
      const isHost = event.hostUid === auth.uid;
      const isGoing = attendees && attendees.some(a => a.id === auth.uid);
      const authenticated = auth.isLoaded && !auth.isEmpty;
      const loadingEvent = requesting[`events/${match.params.id}`];
      if (eventChat.length > 0) {
         eventChat = createDataTree(eventChat);
      }

      if (loadingEvent || initialLoading) {
         return <LoadingComponent inverted />;
      }

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventDetailedHeader
                  authenticated={authenticated}
                  cancelGoingToEvent={cancelGoingToEvent}
                  event={event}
                  isHost={isHost}
                  isGoing={isGoing}
                  goingToEvent={goingToEvent}
                  loading={loading}
                  openModal={openModal}
               />
               <EventDetailedInfo event={event} />
               {authenticated && (
                  <EventDetailedChat
                     addEventComment={addEventComment}
                     eventChat={eventChat}
                     eventId={event.id}
                  />
               )}
            </Grid.Column>
            <Grid.Column width={6}>
               <EventDetailedSidebar attendees={attendees} />
            </Grid.Column>
         </Grid>
      );
   }
}

EventDetailedPage.defaultProps = {
   eventChat: [],
};

EventDetailedPage.propTypes = {
   addEventComment: PropTypes.func.isRequired,
   auth: PropTypes.shape({
      uid: PropTypes.string,
   }).isRequired,
   cancelGoingToEvent: PropTypes.func.isRequired,
   event: PropTypes.shape({
      attendees: PropTypes.object,
   }).isRequired,
   eventChat: PropTypes.arrayOf(PropTypes.object),
   firestore: PropTypes.shape({
      setListener: PropTypes.func.isRequired,
      unsetListener: PropTypes.func.isRequired,
   }).isRequired,
   goingToEvent: PropTypes.func.isRequired,
   history: PropTypes.shape({
      push: PropTypes.func.isRequired,
   }).isRequired,
   loading: PropTypes.bool.isRequired,
   match: PropTypes.shape({
      params: PropTypes.shape({
         id: PropTypes.string.isRequired,
      }).isRequired,
   }).isRequired,
   openModal: PropTypes.func.isRequired,
   requesting: requestingPropType.isRequired,
};

export default compose(
   withFirestore,
   connect(
      mapState,
      actions,
   ),
   firebaseConnect(props => props.auth.isLoaded && !props.auth.isEmpty && [`event_chat/${props.match.params.id}`]),
)(EventDetailedPage);
