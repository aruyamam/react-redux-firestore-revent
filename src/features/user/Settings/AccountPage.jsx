import React from 'react';
import PropTypes from 'prop-types';
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
   error, invalid, submitting, handleSubmit, updatePassword, providerId,
}) => (
   <Segment>
      <Header dividing content="Account" size="large" />
      {providerId && providerId === 'password' && (
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
      )}

      {providerId && providerId === 'facebook.com' && (
         <div>
            <Header color="teal" content="Facebook Account" sub />
            <p>Please visit Facebook to update your account settings</p>
            <Button color="facebook" type="button">
               <Icon name="facebook" />
               Go to Facebook
            </Button>
         </div>
      )}

      {providerId && providerId === 'google.com' && (
         <div>
            <Header color="teal" content="Google Account" sub />
            <p>Please visit Google to update your account settings</p>
            <Button color="google plus" type="button">
               <Icon name="google plus" />
               Go to Google
            </Button>
         </div>
      )}
   </Segment>
);

AccountPage.defaultProps = {
   error: '',
};

AccountPage.propTypes = {
   error: PropTypes.string,
   handleSubmit: PropTypes.func.isRequired,
   invalid: PropTypes.bool.isRequired,
   providerId: PropTypes.string.isRequired,
   submitting: PropTypes.bool.isRequired,
   updatePassword: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'account', validate })(AccountPage);
