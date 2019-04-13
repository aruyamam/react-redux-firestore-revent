import React from 'react';
import PropTypes from 'prop-types';

const HomePage = ({ history }) => (
   <div>
      <div className="ui inverted vertical masthead center aligned segment">
         <div className="ui text continer">
            <h1 className="ui inverted stackable header">
               <img src="/assets/logo.png" alt="logo" className="ui image massive" />
               <div className="content">Re-vents</div>
            </h1>
            <h2>Do whatever you want to do</h2>
            <button
               onClick={() => history.push('/events')}
               className="ui huge white inverted button"
               type="button"
            >
               Get Started
               <i className="right arrow icon" />
            </button>
         </div>
      </div>
      <div style={{ textAlign: 'center' }}>
         Icons made by
         {' '}
         <a href="http://www.freepik.com" title="Freepik">
            Freepik
         </a>
         {' from '}
         <a href="https://www.flticon.com/" title="Flaticon">
            www.flaticon.com
         </a>
         {' is licensed by '}
         <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">
            CC 3.0 BY
         </a>
      </div>
   </div>
);

HomePage.propTypes = {
   history: PropTypes.shape({
      push: PropTypes.func.isRequired,
   }).isRequired,
};

export default HomePage;
