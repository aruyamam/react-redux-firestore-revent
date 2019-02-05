import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
   Button, Divider, Form, Header, Segment,
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import TextInput from '../../../app/common/form/TextInput';
import RadioInput from '../../../app/common/form/RadioInput';

class BasicPage extends Component {
   state = {};

   render() {
      const {
         pristine, submitting, handleSubmit, updateProfile,
      } = this.props;

      return (
         <Segment>
            <Header content="Basics" dividing size="large" />
            <Form onSubmit={handleSubmit(updateProfile)}>
               <Field
                  component={TextInput}
                  name="displayName"
                  type="text"
                  placeholder="Known As"
                  width={8}
               />
               <Form.Group inline>
                  <p style={{ margin: '0 10px 0 0' }}>Gender: </p>
                  <Field
                     component={RadioInput}
                     label="Male"
                     name="gender"
                     type="radio"
                     value="male"
                  />
                  <Field
                     component={RadioInput}
                     label="Female"
                     name="gender"
                     type="radio"
                     value="female"
                  />
               </Form.Group>
               <Field
                  component={DateInput}
                  dateFormat="YYYY-MM-DD"
                  dropdownMode="select"
                  maxDate={moment().subtract(18, 'years')}
                  name="dateOfBirth"
                  placeholder="Date of the Birth"
                  showMonthDropdown
                  showYearDropdown
                  width={8}
               />
               <Field
                  component={PlaceInput}
                  label="Female"
                  name="city"
                  options={{ types: ['(cities)'] }}
                  placeholder="Home Town"
                  width={8}
               />
               <Divider />
               <Button
                  content="Update Profile"
                  disabled={pristine || submitting}
                  positive
                  size="large"
               />
            </Form>
         </Segment>
      );
   }
}

BasicPage.propTypes = {
   handleSubmit: PropTypes.func.isRequired,
   pristine: PropTypes.bool.isRequired,
   submitting: PropTypes.bool.isRequired,
   updateProfile: PropTypes.func.isRequired,
};

export default reduxForm({
   destroyOnUnmount: false,
   enableReinitialize: true,
   form: 'userProfile',
})(BasicPage);
