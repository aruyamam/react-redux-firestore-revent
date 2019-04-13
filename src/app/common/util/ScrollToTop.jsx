import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ScrollToTop extends Component {
   componentDidUpdate(prevProps) {
      const { location } = this.props;

      if (location.pathname !== prevProps.location.pathname) {
         window.scrollTo(0, 0);
      }
   }

   render() {
      const { children } = this.props;

      return children;
   }
}

ScrollToTop.propTypes = {
   children: PropTypes.arrayOf(PropTypes.element).isRequired,
   location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
   }).isRequired,
};

export default withRouter(ScrollToTop);
