import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
   Button, Divider, Form, Label, Segment,
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';
import { registerUser } from '../authActions';

const actions = {
   registerUser,
};

const validate = combineValidators({
   displayName: isRequired('displayName'),
   email: isRequired('email'),
   password: isRequired('password'),
});

const RegisterForm = ({
   handleSubmit, registerUser, error, invalid, submitting,
}) => (
   <div>
      <Form onSubmit={handleSubmit(registerUser)} size="large">
         <Segment>
            <Field name="displayName" type="text" component={TextInput} placeholder="Known As" />
            <Field name="email" type="text" component={TextInput} placeholder="Email Address" />
            <Field name="password" type="password" component={TextInput} placeholder="Password" />
            {error && (
               <Label basic color="red">
                  {error}
               </Label>
            )}
            <Button disabled={invalid || submitting} fluid size="large" color="teal">
               Register
            </Button>
            <Divider horizontal>Or</Divider>
            <SocialLogin />
         </Segment>
      </Form>
   </div>
);

RegisterForm.propTypes = {
   handleSubmit: PropTypes.func.isRequired,
   registerUser: PropTypes.func.isRequired,
   invalid: PropTypes.bool.isRequired,
   submitting: PropTypes.bool.isRequired,
};

export default connect(
   null,
   actions,
)(reduxForm({ form: 'registerForm', validate })(RegisterForm));
