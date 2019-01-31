import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { registerUser } from '../authActions';

const actions = {
   registerUser,
};

const RegisterForm = ({ handleSubmit, registerUser }) => (
   <Form onSubmit={handleSubmit(registerUser)} size="large">
      <Segment>
         <Field name="displayName" type="text" component={TextInput} placeholder="Known As" />
         <Field name="email" type="text" component={TextInput} placeholder="Email Address" />
         <Field name="password" type="password" component={TextInput} placeholder="Password" />
         <Button fluid size="large" color="teal">
            Register
         </Button>
      </Segment>
   </Form>
);

export default connect(
   null,
   actions,
)(reduxForm({ form: 'registerForm' })(RegisterForm));
