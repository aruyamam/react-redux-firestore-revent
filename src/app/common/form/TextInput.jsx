import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';

const TextInput = ({
   input, type, placeholder, meta: { touched, error },
}) => (
   <Form.Field error={touched && !!error}>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && (
         <Label basic color="red">
            {error}
         </Label>
      )}
   </Form.Field>
);

TextInput.propTypes = {
   input: PropTypes.shape({
      onBlur: PropTypes.func.isRequired,
   }).isRequired,
   meta: PropTypes.shape({
      error: PropTypes.string,
      touched: PropTypes.bool.isRequired,
   }).isRequired,
   placeholder: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
};

export default TextInput;
