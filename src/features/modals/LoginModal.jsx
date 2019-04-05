import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import LoginForm from '../auth/Login/LoginForm';
import { closeModal } from './modalActions';

const actions = { closeModal };

class LoginModal extends Component {
   state = {};

   render() {
      const { closeModal } = this.props;

      return (
         <Modal size="mini" open onClose={closeModal}>
            <Modal.Header>Login to Re-vents</Modal.Header>
            <Modal.Content>
               <Modal.Description>
                  <LoginForm />
               </Modal.Description>
            </Modal.Content>
         </Modal>
      );
   }
}

LoginModal.propTypes = {
   closeModal: PropTypes.func.isRequired,
};

export default connect(
   null,
   actions,
)(LoginModal);
