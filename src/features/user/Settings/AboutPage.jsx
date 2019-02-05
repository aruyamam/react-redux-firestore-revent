import React from 'react';
import PropTypes from 'prop-types';
import {
   Button, Divider, Form, Header, Segment,
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import PlaceInput from '../../../app/common/form/PlaceInput';
import RadioInput from '../../../app/common/form/RadioInput';
import SelectInput from '../../../app/common/form/SelectInput';
import TextArea from '../../../app/common/form/TextArea';
import TextInput from '../../../app/common/form/TextInput';

const interests = [
   { key: 'drinks', text: 'Drinks', value: 'drinks' },
   { key: 'culture', text: 'Culture', value: 'culture' },
   { key: 'film', text: 'Film', value: 'film' },
   { key: 'food', text: 'Food', value: 'food' },
   { key: 'music', text: 'Music', value: 'music' },
   { key: 'travel', text: 'Travel', value: 'travel' },
];

const AboutPage = ({
   pristine, submitting, handleSubmit, updateProfile,
}) => (
   <Segment>
      <Header content="About Me" dividing size="large" />
      <p>Complete your profile to get me the most out of this site</p>
      <Form onSubmit={handleSubmit(updateProfile)}>
         <Form.Group style={{ margin: 0 }}>
            <p style={{ margin: 0 }}>Tell us your status:</p>
            <Field
               component={RadioInput}
               label="Single"
               name="status"
               type="radio"
               value="single"
            />
            <Field
               component={RadioInput}
               label="Relationship"
               name="status"
               type="radio"
               value="relationship"
            />
         </Form.Group>
         <Divider />
         <p style={{ margin: '0 0 5px 0' }}>Tell us about yourself</p>
         <Field component={TextArea} name="about" placeholder="About Me" />
         <Field
            component={SelectInput}
            multiple
            name="interests"
            options={interests}
            placeholder="Select your interests"
            value="interests"
         />
         <Field
            component={TextInput}
            name="occupation"
            placeholder="Occupation"
            type="text"
            width={8}
         />
         <Field
            component={PlaceInput}
            name="origin"
            options={{ types: ['(regions)'] }}
            placeholder="Country of Origin"
            type="text"
            width={8}
         />
         <Divider />
         <Button content="Update Profile" disabled={pristine || submitting} positive size="large" />
      </Form>
   </Segment>
);

AboutPage.propTypes = {
   handleSubmit: PropTypes.func.isRequired,
   pristine: PropTypes.bool.isRequired,
   submitting: PropTypes.bool.isRequired,
   updateProfile: PropTypes.func.isRequired,
};

export default reduxForm({
   destroyOnUnmount: false,
   enableReinitialize: true,
   form: 'userProfile',
})(AboutPage);
