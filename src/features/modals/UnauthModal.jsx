import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Divider, Modal } from 'semantic-ui-react';
import { closeModal, openModal } from './modalActions';

const actions = {
   closeModal,
   openModal,
};

const UnauthModal = ({
   closeModal, history, location, openModal,
}) => {
   const handleCloseModal = () => {
      if (location.pathname.includes('/event')) {
         closeModal();
      }
      else {
         history.goBack();
         closeModal();
      }
   };

   return (
      <Modal size="mini" open onClose={handleCloseModal}>
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
                  <Button onClick={handleCloseModal}>Cancel</Button>
               </div>
            </Modal.Description>
         </Modal.Content>
      </Modal>
   );
};

UnauthModal.propTypes = {
   closeModal: PropTypes.func.isRequired,
   history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
   }).isRequired,
   location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
   }).isRequired,
   openModal: PropTypes.func.isRequired,
};

export default withRouter(
   connect(
      null,
      actions,
   )(UnauthModal),
);
