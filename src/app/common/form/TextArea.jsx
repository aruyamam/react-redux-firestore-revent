import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';

const TextArea = ({
   input, rows, placeholder, meta: { touched, error },
}) => (
   <Form.Field error={touched && !!error}>
      <textarea {...input} placeholder={placeholder} rows={rows} />
      {touched && error && (
         <Label basic color="red">
            {error}
         </Label>
      )}
   </Form.Field>
);

TextArea.defaultProps = {
   placeholder: '',
};

TextArea.propTypes = {
   input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      onBlur: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
      onDragStart: PropTypes.func.isRequired,
      onDrop: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
   }).isRequired,
   meta: PropTypes.shape({
      error: PropTypes.string,
      touched: PropTypes.bool.isRequired,
   }).isRequired,
   placeholder: PropTypes.string,
   rows: PropTypes.number.isRequired,
};

export default TextArea;
