import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const RadioInput = ({ input, type, label }) => (
   <Form.Field>
      <div className="ui radio">
         <label htmlFor={input.name}>
            <input style={{ position: 'relative', top: '2px' }} type={type} {...input} />
            {' '}
            {label}
         </label>
      </div>
   </Form.Field>
);

RadioInput.propTypes = {
   label: PropTypes.string.isRequired,
   input: PropTypes.shape({
      name: PropTypes.string,
   }).isRequired,
   type: PropTypes.string.isRequired,
};

export default RadioInput;
