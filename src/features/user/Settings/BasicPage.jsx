import React, { Component } from 'react';
import {
   Button, Divider, Form, Header, Segment,
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import TextInput from '../../../app/common/form/TextInput';

class BasicPage extends Component {
   state = {};

   render() {
      const { pristine, submitting } = this.props;

      return (
         <Segment>
            <Header content="Basics" dividing size="large" />
            <Form>
               <Field
                  component={TextInput}
                  name="displayName"
                  type="text"
                  placeholder="Known As"
                  width={8}
               />
               <Field
                  component={DateInput}
                  name="dateOfBirth"
                  placeholder="Date of the Birth"
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

export default reduxForm({ form: 'userProfile', enableReinitialize: true })(BasicPage);
