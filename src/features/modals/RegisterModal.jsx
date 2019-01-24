import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import RegisterForm from '../auth/Register/RegisterForm';
import { closeModal } from './modalActions';

const actions = { closeModal };

class RegisterModal extends Component {
   state = {};

   render() {
      const { closeModal } = this.props;

      return (
         <Modal size="mini" open onClose={closeModal}>
            <Modal.Header>Sign Up to Re-vents!</Modal.Header>
            <Modal.Content>
               <Modal.Description>
                  <RegisterForm />
               </Modal.Description>
            </Modal.Content>
         </Modal>
      );
   }
}

export default connect(
   null,
   actions,
)(RegisterModal);
