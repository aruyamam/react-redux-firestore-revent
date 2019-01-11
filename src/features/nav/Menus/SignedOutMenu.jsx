import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button } from 'semantic-ui-react';

const SignedOutMenu = ({ signIn }) => (
   <Menu.Item position="right">
      <Button onClick={signIn} basic inverted content="Login" />
      <Button basic inverted content="Register" style={{ marginLeft: '0.5em' }} />
   </Menu.Item>
);

SignedOutMenu.propTypes = {
   signIn: PropTypes.func.isRequired,
};

export default SignedOutMenu;
