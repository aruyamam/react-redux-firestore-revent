import React from 'react';
import {
   Button, Divider, Form, Icon, Label, Header, Segment,
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
   combineValidators, composeValidators, isRequired, matchesField,
} from 'revalidate';
import TextInput from '../../../app/common/form/TextInput';

const validate = combineValidators({
   newPassword1: isRequired({ message: 'Please enter a password' }),
   newPassword2: composeValidators(
      isRequired({ message: 'Please confirm your new password' }),
      matchesField('newPassword1')({ message: 'Passwords do not match' }),
   )(),
});

const AccountPage = ({
   error, invalid, submitting, handleSubmit, updatePassword,
}) => (
   <Segment>
      <Header dividing content="Account" size="large" />
      <div>
         <Header color="teal" content="Change password" sub />
         <p>Use this form to update your account settings</p>
         <Form onSubmit={handleSubmit(updatePassword)}>
            <Field
               basic
               component={TextInput}
               inline
               name="newPassword1"
               placeholder="New Password"
               pointing="left"
               type="password"
               width={8}
            />
            <Field
               basic
               component={TextInput}
               inline
               name="newPassword2"
               placeholder="Confirm Password"
               pointing="left"
               type="password"
               width={8}
            />
            {error && (
               <Label basic color="red">
                  {error}
               </Label>
            )}
            <Divider />
            <Button
               content="Update Password"
               disabled={invalid || submitting}
               positive
               size="large"
            />
         </Form>
      </div>

      <div>
         <Header color="teal" content="Facebook Account" sub />
         <p>Please visit Facebook to update your account settings</p>
         <Button color="facebook" type="button">
            <Icon name="facebook" />
            Go to Facebook
         </Button>
      </div>

      <div>
         <Header color="teal" content="Google Account" sub />
         <p>Please visit Google to update your account settings</p>
         <Button color="google plus" type="button">
            <Icon name="google plus" />
            Go to Facebook
         </Button>
      </div>
   </Segment>
);

export default reduxForm({ form: 'account', validate })(AccountPage);
