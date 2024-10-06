import React from 'react';
import { Modal } from '.';

const EditModal = ({ isOpen, close }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <h1 className="text-2xl">Tweet'i Düzenle</h1>

      <form action=""></form>
    </Modal>
  );
};

export default EditModal;
