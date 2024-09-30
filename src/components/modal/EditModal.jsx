import React from 'react';
import { Modal } from '.';

const EditModal = ({ isOpen, close }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <h1>Düzenleme İşlemi</h1>
    </Modal>
  );
};

export default EditModal;
