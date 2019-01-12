import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';

class NavBar extends Component {
   state = {
      authenticated: false,
   };

   handleSignIn = () => {
      this.setState({
         authenticated: true,
      });
   };

   handleSignOut = () => {
      const { history } = this.props;

      this.setState({
         authenticated: false,
      });
      history.push('/');
   };

   render() {
      const { authenticated } = this.state;

      return (
         <Menu inverted fixed="top">
            <Container>
               <Menu.Item as={Link} to="/" header>
                  <img src="/assets/logo.png" alt="logo" className="logo" />
                  Re-events
               </Menu.Item>
               <Menu.Item as={NavLink} to="/events" name="Events" />
               {authenticated && <Menu.Item as={NavLink} to="/people" name="People" />}
               {authenticated && (
                  <Menu.Item>
                     <Button
                        as={Link}
                        to="/createEvent"
                        floated="right"
                        positive
                        inverted
                        content="Create Event"
                     />
                  </Menu.Item>
               )}
               {authenticated ? (
                  <SignedInMenu signOut={this.handleSignOut} />
               ) : (
                  <SignedOutMenu signIn={this.handleSignIn} />
               )}
            </Container>
         </Menu>
      );
   }
}

NavBar.propTypes = {
   history: PropTypes.shape({
      push: PropTypes.func.isRequired,
   }).isRequired,
};

export default withRouter(NavBar);
