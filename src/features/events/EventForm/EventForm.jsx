import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button } from 'semantic-ui-react';

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

class EventForm extends Component {
   state = {
      event: Object.assign({}, this.props.event),
   };

   onFormSubmit = (evt) => {
      evt.preventDefault();
      const { event } = this.state;
      const { updateEvent, createEvent } = this.props;

      if (event.id) {
         updateEvent(event);
      }
      else {
         createEvent(event);
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
      const { handleCancel } = this.props;
      const { event } = this.state;

      return (
         <Segment>
            <Form onSubmit={this.onFormSubmit}>
               <Form.Field>
                  <label htmlFor="title">
                     Event Title
                     <input
                        onChange={this.onInputChange}
                        type="text"
                        id="title"
                        name="title"
                        value={event.title}
                        placeholder="Event Title"
                     />
                  </label>
               </Form.Field>
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
               <Button onClick={handleCancel} type="button">
                  Cancel
               </Button>
            </Form>
         </Segment>
      );
   }
}

export default connect(mapState)(EventForm);
