import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import cuid from 'cuid';
import {
   Segment, Form, Button, Grid, Header,
} from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';

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

const category = [
   { key: 'drinks', text: 'Drinks', value: 'drinks' },
   { key: 'culture', text: 'Culture', value: 'culture' },
   { key: 'film', text: 'Film', value: 'film' },
   { key: 'food', text: 'Food', value: 'food' },
   { key: 'music', text: 'Music', value: 'music' },
   { key: 'travel', text: 'Travel', value: 'travel' },
];

class EventForm extends Component {
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

   render() {
      const { history } = this.props;

      return (
         <Segment>
            <Grid>
               <Grid.Column>
                  <Segment>
                     <Header sub color="teal" content="Event Details" />
                     <Form onSubmit={this.onFormSubmit}>
                        <Field
                           name="title"
                           type="text"
                           component={TextInput}
                           placeholder="Give your event a dname"
                        />
                        <Field
                           name="category"
                           type="text"
                           component={SelectInput}
                           options={category}
                           placeholder="What is your event about"
                        />
                        <Field
                           name="description"
                           type="text"
                           rows={3}
                           component={TextArea}
                           placeholder="Tell us about your event"
                        />
                        <Header sub color="teal" content="Event Location Details" />
                        <Field
                           name="city"
                           type="text"
                           component={TextInput}
                           placeholder="Event City"
                        />
                        <Field
                           name="venue"
                           type="text"
                           component={TextInput}
                           placeholder="Event Venue"
                        />
                        <Field
                           name="date"
                           type="text"
                           component={TextInput}
                           placeholder="Event Date"
                        />
                     </Form>
                  </Segment>
               </Grid.Column>
            </Grid>
            <Button type="submit" positive>
               Submit
            </Button>
            <Button onClick={history.goBack} type="button">
               Cancel
            </Button>
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
