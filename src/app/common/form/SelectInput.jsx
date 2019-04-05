import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Select } from 'semantic-ui-react';

const SelectInput = ({
   input, placeholder, options, meta: { touched, error },
}) => (
   <Form.Field error={touched && !!error}>
      <Select
         value={input.value || [null]}
         onChange={(e, data) => input.onChange(data.value)}
         placeholder={placeholder}
         options={options}
         multiple
      />
      {touched && error && (
         <Label basic color="red">
            {error}
         </Label>
      )}
   </Form.Field>
);

SelectInput.propTypes = {
   input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
   }).isRequired,
   meta: PropTypes.shape({
      error: PropTypes.string,
      touched: PropTypes.bool.isRequired,
   }).isRequired,
   options: PropTypes.arrayOf(
      PropTypes.shape({
         key: PropTypes.string.isRequired,
         text: PropTypes.string.isRequired,
         value: PropTypes.string.isRequired,
      }),
   ).isRequired,
   placeholder: PropTypes.string.isRequired,
};

export default SelectInput;
