import Mapa from './Detalle/Mapa';

const {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} = require('@chakra-ui/react');

const DetalleDenunciaModal = ({ onClose, isOpen, onOpen, denuncia }) => {
  console.log(`DetalleDenuncuaModal ${JSON.stringify(denuncia, null, 4)}`);
  return (
    <Modal onClose={onClose} size="6xl" isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>DETALLE DENUNCIA</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Mapa 
            denuncia = {denuncia}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetalleDenunciaModal;
