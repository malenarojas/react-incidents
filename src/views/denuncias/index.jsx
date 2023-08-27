// Chakra imports
import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import useDenuncias from 'hooks/useDenuncias';
import DevelopmentTable from 'views/denuncias/components/DevelopmentTable';
import {
  columnsDataDevelopment,
} from 'views/denuncias/variables/columnsData';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tableDataDevelopment from 'views/denuncias/variables/tableDataDevelopment.json';
import { setDetalleDenuncia } from 'redux/denunciaSlice';
import DetalleDenunciaModal from './components/DetalleDenunciaModal'

export default function Settings() {
  // Chakra Color Mode
  const dispatch = useDispatch();
  const { obtenerDenuncia, obtenerDetalleDenuncia } = useDenuncias();

  const { denuncias, denuncia } = useSelector((state) => state.denuncia);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    obtenerDenuncia();
  }, []);

  useEffect(() => {
    console.log(`denuncia: ${JSON.stringify(denuncia, null, 4)}`);
    if (denuncia) {
      onOpen();
    }
  }, [denuncia]);

  const handleDetalleDenunciaClick = (idDenuncia) => {
    obtenerDetalleDenuncia({ idDenuncia });
  };

  const handleOnClose = () => {
    dispatch(setDetalleDenuncia({ denuncia: null }));
    onClose();
  };
  const list = [""]
  return (
    <>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: '20px', xl: '20px' }}
        >
          {denuncias && denuncias.length > 0 ? (
            <DevelopmentTable
              columnsData={columnsDataDevelopment}
              tableData={denuncias}
              handleDetalleDenunciaClick={handleDetalleDenunciaClick}
            />
          ) : (
            <h1>Cargando Denuncias...</h1>
          )}
        </SimpleGrid>
      </Box>
      {denuncia && (
        <DetalleDenunciaModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={handleOnClose}
          denuncia={denuncia}
        />
      )}
    </>
  );
}
