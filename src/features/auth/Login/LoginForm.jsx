import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';

const LoginForm = () => (
   <Form error size="large">
      <Segment>
         <Field name="email" type="text" component={TextInput} placeholder="Email Address" />
         <Field name="password" type="password" component={TextInput} placeholder="Password" />
         <Button fluid size="large" color="teal">
            Login
         </Button>
      </Segment>
   </Form>
);

export default reduxForm({ form: 'loginForm' })(LoginForm);
