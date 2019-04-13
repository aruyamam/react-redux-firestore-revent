import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({
   input: {
      value, onChange, onBlur, ...restInput
   },
   placeholder,
   meta: { touched, error },
   width,
   ...rest
}) => {
   if (value && typeof value === 'object') {
      value = moment(value, 'X');
   }

   return (
      <Form.Field error={touched && !!error} width={width}>
         <DatePicker
            {...rest}
            placeholderText={placeholder}
            selected={value ? moment(value) : null}
            onBlur={onBlur}
            onChange={onChange}
            {...restInput}
         />
         {touched && error && (
            <Label basic color="red">
               {error}
            </Label>
         )}
      </Form.Field>
   );
};

DateInput.defaultProps = {
   width: 16,
};

DateInput.propTypes = {
   input: PropTypes.shape({
      onBlur: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
   }).isRequired,
   meta: PropTypes.shape({
      error: PropTypes.string,
      touched: PropTypes.bool.isRequired,
   }).isRequired,
   placeholder: PropTypes.string.isRequired,
   width: PropTypes.number,
};

export default DateInput;
