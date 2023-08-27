import Mapa from './Detalle/Mapa';
import React, { useMemo } from 'react';

const {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalOverlay,
} = require('@chakra-ui/react');

const DetalleIncidenciaModal = ({ onClose, isOpen, onOpen, incidencia }) => {


  return (
    <Modal scrollBehavior="outside" onClose={onClose} size="6xl" isOpen={isOpen}>
      {/* <ModalOverlay
        bg="blackAlpha.100"
        backdropFilter="blur(3px)"
      /> */}
      <ModalContent>
        <ModalHeader>DETALLE INCIDENCIA</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Mapa 
            incidencia={incidencia}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetalleIncidenciaModal;
