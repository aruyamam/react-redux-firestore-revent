import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import cuid from 'cuid';
import { Segment, Form, Button } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';

const mapState = (state, ownProps) => {
   const { events } = state;
   const eventId = ownProps.match.params.id;

   let event = {
      title: '',
      date: '',
      city: '',
      venue: '',
      hostedBy: '',
   };

   if (eventId && events.length > 0) {
      [event] = events.filter(event => event.id === eventId);
   }

   return {
      event,
   };
};

const actions = {
   createEvent,
   updateEvent,
};

class EventForm extends Component {
   state = {
      event: Object.assign({}, this.props.event),
   };

   onFormSubmit = (evt) => {
      evt.preventDefault();

      const { event } = this.state;
      const { updateEvent, createEvent, history } = this.props;

      if (event.id) {
         updateEvent(event);
         history.goBack();
      }
      else {
         const newEvent = {
            ...event,
            id: cuid(),
            hostPhotoURL: '/assets/user.png',
         };

         createEvent(newEvent);
         history.push('/events');
      }
   };

   onInputChange = (evt) => {
      const { event: newEvent } = this.state;
      newEvent[evt.target.name] = evt.target.value;

      this.setState({
         event: newEvent,
      });
   };

   render() {
      const { history } = this.props;
      const { event } = this.state;

      return (
         <Segment>
            <Form onSubmit={this.onFormSubmit}>
               <Field name="title" type="text" component="input" placeholder="Event Title" />
               <Form.Field>
                  <label htmlFor="date">
                     Event Date
                     <input
                        onChange={this.onInputChange}
                        type="date"
                        id="date"
                        name="date"
                        value={event.date}
                        placeholder="Event Date"
                     />
                  </label>
               </Form.Field>
               <Form.Field>
                  <label htmlFor="city">
                     City
                     <input
                        onChange={this.onInputChange}
                        type="text"
                        id="city"
                        name="city"
                        value={event.city}
                        placeholder="City event is taking place"
                     />
                  </label>
               </Form.Field>
               <Form.Field>
                  <label htmlFor="venue">
                     Venue
                     <input
                        onChange={this.onInputChange}
                        type="text"
                        id="venue"
                        name="venue"
                        value={event.venue}
                        placeholder="Enter the Venue of the event"
                     />
                  </label>
               </Form.Field>
               <Form.Field>
                  <label htmlFor="hostedBy">
                     Hosted By
                     <input
                        onChange={this.onInputChange}
                        type="text"
                        id="hostedBy"
                        name="hostedBy"
                        value={event.hostedBy}
                        placeholder="Enter the name of person hosting"
                     />
                  </label>
               </Form.Field>
               <Button type="submit" positive>
                  Submit
               </Button>
               <Button onClick={history.goBack} type="button">
                  Cancel
               </Button>
            </Form>
         </Segment>
      );
   }
}

EventForm.propTypes = {
   createEvent: PropTypes.func.isRequired,
   updateEvent: PropTypes.func.isRequired,
   history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
   }).isRequired,
};

export default connect(
   mapState,
   actions,
)(reduxForm({ form: 'eventForm' })(EventForm));
