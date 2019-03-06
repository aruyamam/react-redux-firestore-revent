import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import TextArea from '../../../app/common/form/TextArea';

class EventDetailedChatForm extends Component {
   handleCommentSubmit = (values) => {
      const { addEventComment, eventId, reset } = this.props;
      addEventComment(eventId, values);
      reset();
   };

   render() {
      const { handleSubmit } = this.props;

      return (
         <Form onSubmit={handleSubmit(this.handleCommentSubmit)}>
            <Field component={TextArea} name="comment" rows={2} type="text" />
            <Button content="Add Reply" labelPosition="left" icon="edit" primary />
         </Form>
      );
   }
}

EventDetailedChatForm.propTypes = {
   addEventComment: PropTypes.func.isRequired,
   eventId: PropTypes.string.isRequired,
   handleSubmit: PropTypes.func.isRequired,
   reset: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'eventChat' })(EventDetailedChatForm);
