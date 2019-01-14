import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Grid } from 'semantic-ui-react';
import cuid from 'cuid';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { createEvent, deleteEvent, updateEvent } from '../eventActions';

const mapState = state => ({
   events: state.events,
});

const actions = {
   createEvent,
   deleteEvent,
   updateEvent,
};

class EventDashboard extends Component {
   state = {
      isOpen: false,
      selectedEvent: null,
   };

   handleFormOpen = () => {
      this.setState({
         selectedEvent: null,
         isOpen: true,
      });
   };

   handleCancel = () => {
      this.setState({ isOpen: false });
   };

   handleUpdateEvent = (updatedEvent) => {
      this.props.updateEvent(updatedEvent);
      this.setState({
         isOpen: false,
         selectedEvent: null,
      });
   };

   handleOpenEvent = eventToOpen => () => {
      this.setState({
         selectedEvent: eventToOpen,
         isOpen: true,
      });
   };

   handleCreateEvent = (newEvent) => {
      newEvent.id = cuid();
      newEvent.hostPhotoURL = '/assets/user.png';
      this.props.createEvent(newEvent);
      this.setState({
         isOpen: false,
      });
   };

   handleDeleteEvent = eventId => () => {
      this.props.deleteEvent(eventId);
   };

   render() {
      const { isOpen, selectedEvent } = this.state;
      const { events } = this.props;

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventList
                  deleteEvent={this.handleDeleteEvent}
                  onEventOpen={this.handleOpenEvent}
                  events={events}
               />
            </Grid.Column>
            <Grid.Column width={6}>
               <Button onClick={this.handleFormOpen} positive content="Create Event" />
               {isOpen && (
                  <EventForm
                     updateEvent={this.handleUpdateEvent}
                     selectedEvent={selectedEvent}
                     createEvent={this.handleCreateEvent}
                     handleCancel={this.handleCancel}
                  />
               )}
            </Grid.Column>
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
