import React from 'react';
import { connect } from 'react-redux';
import {
   Button, Divider, Form, Label, Segment,
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';
import { login } from '../authActions';

const actions = {
   login,
};

const LoginForm = ({ login, handleSubmit, error }) => (
   <Form error size="large" onSubmit={handleSubmit(login)}>
      <Segment>
         <Field name="email" type="text" component={TextInput} placeholder="Email Address" />
         <Field name="password" type="password" component={TextInput} placeholder="Password" />
         {error && (
            <Label basic color="red">
               {error}
            </Label>
         )}
         <Button fluid size="large" color="teal">
            Login
         </Button>
         <Divider horizontal>Or</Divider>
         <SocialLogin />
      </Segment>
   </Form>
);

export default connect(
   null,
   actions,
)(reduxForm({ form: 'loginForm' })(LoginForm));
