import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingComponent = ({ inverted }) => (
   <Dimmer inverted={inverted} active>
      <Loader content="Loading..." />
   </Dimmer>
);

LoadingComponent.defaultProps = {
   inverted: true,
};

LoadingComponent.propTypes = {
   inverted: PropTypes.bool,
};

export default LoadingComponent;
