import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { closeModal } from './modalActions';

const actions = {
   closeModal,
};

const TestModal = ({ closeModal }) => (
   <Modal closeIcon="close" open onClose={closeModal}>
      <Modal.Header>Test Modal</Modal.Header>
      <Modal.Content>
         <Modal.Description>
            <p>Test Modal... nothing to see here</p>
         </Modal.Description>
      </Modal.Content>
   </Modal>
);

TestModal.propTypes = {
   closeModal: PropTypes.func.isRequired,
};

export default connect(
   null,
   actions,
)(TestModal);
