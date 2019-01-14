import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid } from 'semantic-ui-react';
import cuid from 'cuid';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

const mapState = state => ({
   events: state.events,
});

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
      const { events } = this.state;

      this.setState({
         events: events.map((event) => {
            if (event.id === updatedEvent.id) {
               return Object.assign({}, updatedEvent);
            }
            return event;
         }),
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
      const updatedEvents = [...this.props.events, newEvent];

      this.setState({
         events: updatedEvents,
         isOpen: false,
      });
   };

   handleDeleteEvent = eventId => () => {
      const updatedEvents = this.props.events.filter(e => e.id !== eventId);
      this.setState({
         events: updatedEvents,
      });
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

export default connect(mapState)(EventDashboard);
