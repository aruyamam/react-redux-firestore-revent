/* global google */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
   composeValidators, combineValidators, isRequired, hasLengthGreaterThan,
} from 'revalidate';
import moment from 'moment';
import {
   Segment, Form, Button, Grid, Header,
} from 'semantic-ui-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';
import { createEvent, updateEvent } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

const mapState = (state, ownProps) => {
   const { events } = state;
   const eventId = ownProps.match.params.id;

   let event = {};

   if (eventId && events.length > 0) {
      [event] = events.filter(event => event.id === eventId);
   }

   return {
      initialValues: event,
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

const validate = combineValidators({
   title: isRequired({ message: 'The event title is required' }),
   cateogry: isRequired({ message: 'Please provide a ctegory' }),
   description: composeValidators(
      isRequired({ message: 'Please enter a description' }),
      hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' }),
   )(),
   city: isRequired('city'),
   venue: isRequired('venue'),
   date: isRequired('date'),
});

class EventForm extends Component {
   state = {
      cityLatLng: {},
      venueLatLng: {},
      scriptLoaded: false,
   };

   handleScriptLoaded = () => this.setState({ scriptLoaded: true });

   handleCitySelect = (selectedCity) => {
      geocodeByAddress(selectedCity)
         .then(results => getLatLng(results[0]))
         .then((latlng) => {
            this.setState({ cityLatLng: latlng });
         })
         .then(() => {
            this.props.change('city', selectedCity);
         });
   };

   handleVenueSelect = (selectedVenue) => {
      geocodeByAddress(selectedVenue)
         .then(results => getLatLng(results[0]))
         .then((latlng) => {
            this.setState({ venueLatLng: latlng });
         })
         .then(() => {
            this.props.change('venue', selectedVenue);
         });
   };

   onFormSubmit = (inputValues) => {
      const values = inputValues;
      values.date = moment(values.date).format();
      values.venueLatLng = this.state.venueLatLng;
      const {
         initialValues, updateEvent, createEvent, history,
      } = this.props;

      if (initialValues.id) {
         updateEvent(values);
         history.goBack();
      }
      else {
         createEvent(values);
         history.push('/events');
      }
   };

   render() {
      const {
         history, handleSubmit, invalid, pristine, submitting,
      } = this.props;
      const { cityLatLng, scriptLoaded } = this.state;

      return (
         <Grid>
            <Script
               url={`https://maps.googleapis.com/maps/api/js?key=${
                  process.env.REACT_APP_GOOGLE_MAP_API
               }&libraries=places`}
               onLoad={this.handleScriptLoaded}
            />
            <Grid.Column width={10}>
               <Segment>
                  <Header sub color="teal" content="Event Details" />
                  <Form onSubmit={handleSubmit(this.onFormSubmit)}>
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
                        component={PlaceInput}
                        options={{ types: ['(cities)'] }}
                        placeholder="Event City"
                        onSelect={this.handleCitySelect}
                     />
                     {scriptLoaded && (
                        <Field
                           name="venue"
                           type="text"
                           component={PlaceInput}
                           options={{
                              location: new google.maps.LatLng(cityLatLng),
                              radius: 1000,
                              types: ['establishment'],
                           }}
                           placeholder="Event Venue"
                           onSelect={this.handleVenueSelect}
                        />
                     )}
                     <Field
                        name="date"
                        type="text"
                        component={DateInput}
                        dateFormat="YYYY-MM-DD HH:mm"
                        timeFormat="HH:mm"
                        showTimeSelect
                        placeholder="Date and Time of event"
                     />
                     <Button type="submit" positive disabled={invalid || submitting || pristine}>
                        Submit
                     </Button>
                     <Button onClick={history.goBack} type="button">
                        Cancel
                     </Button>
                  </Form>
               </Segment>
            </Grid.Column>
         </Grid>
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
   handleSubmit: PropTypes.func.isRequired,
   initialValues: PropTypes.shape({
      attendees: PropTypes.arrayOf(PropTypes.object),
      category: PropTypes.string,
      city: PropTypes.string,
      date: PropTypes.string,
      description: PropTypes.string,
      hostPhotoURL: PropTypes.string,
      hostedBy: PropTypes.string,
      it: PropTypes.string,
      title: PropTypes.string,
      veneue: PropTypes.string,
   }).isRequired,
   invalid: PropTypes.bool.isRequired,
   pristine: PropTypes.bool.isRequired,
   submitting: PropTypes.bool.isRequired,
};

export default connect(
   mapState,
   actions,
)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm));
