import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';
import { openModal } from '../../modals/modalActions';

const actions = {
   openModal,
};

const mapState = ({ firebase: { auth, profile } }) => ({ auth, profile });

class NavBar extends Component {
   handleSignIn = () => {
      const { openModal } = this.props;
      openModal('LoginModal');
   };

   handleRegister = () => {
      const { openModal } = this.props;
      openModal('RegisterModal');
   };

   handleSignOut = () => {
      const { history, firebase } = this.props;

      firebase.logout();
      history.push('/');
   };

   render() {
      const { auth, profile } = this.props;
      const authenticated = auth.isLoaded && !auth.isEmpty;

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
                  <SignedInMenu auth={auth} profile={profile} signOut={this.handleSignOut} />
               ) : (
                  <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />
               )}
            </Container>
         </Menu>
      );
   }
}

NavBar.propTypes = {
   auth: PropTypes.shape({
      isLoaded: PropTypes.bool.isRequired,
      isEmpty: PropTypes.bool.isRequired,
   }).isRequired,
   firebase: PropTypes.shape({
      logout: PropTypes.func.isRequired,
   }).isRequired,
   history: PropTypes.shape({
      push: PropTypes.func.isRequired,
   }).isRequired,
   openModal: PropTypes.func.isRequired,
   profile: PropTypes.shape({
      displayName: PropTypes.string,
      photoURL: PropTypes.string,
   }).isRequired,
};

export default withRouter(
   withFirebase(
      connect(
         mapState,
         actions,
      )(NavBar),
   ),
);
