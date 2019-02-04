import React from 'react';
import { Form } from 'semantic-ui-react';

const RadioInput = ({
   input, name, type, label,
}) => (
   <Form.Field>
      <div className="ui radio">
         <label htmlFor={name}>
            <input style={{ position: 'relative', top: '2px' }} type={type} {...input} />
            {' '}
            {label}
         </label>
      </div>
   </Form.Field>
);

export default RadioInput;
