import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Modal } from 'semantic-ui-react';
import { closeModal, openModal } from './modalActions';

const actions = {
   closeModal,
   openModal,
};

const UnauthModal = ({ closeModal, openModal }) => (
   <Modal>
      <Modal.Header>You need to be signed in to do that!</Modal.Header>
      <Modal.Content>
         <Modal.Description>
            <p>Please either login or register to see this page</p>
            <Button.Group widths={4}>
               <Button onClick={() => openModal('LoginModal')} fluid color="teal">
                  Login
               </Button>
               <Button onClick={() => openModal('RegisterModal')} fluid positive>
                  Register
               </Button>
            </Button.Group>
            <Divider />
            <div style={{ textAlign: 'center' }}>
               <p>Or click cancel to continue as a guest</p>
               <Button onClick={closeModal}>Cancel</Button>
            </div>
         </Modal.Description>
      </Modal.Content>
   </Modal>
);

export default connect(
   null,
   actions,
)(UnauthModal);
