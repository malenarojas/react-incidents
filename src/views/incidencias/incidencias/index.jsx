// Chakra imports
import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import useIncidencias from 'hooks/useIncidencias';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DevelopmentTable from 'views/incidencias/incidencias/components/DevelopmentTable';
import { columnsDataDevelopment } from 'views/incidencias/incidencias/variables/columnsData';
import tableDataDevelopment from 'views/incidencias/incidencias/variables/tableDataDevelopment.json';
import DetalleIncidenciaModal from './components/DetalleIncidenciaModal';
import { setDetalleIncidencia } from 'redux/incidenciaSlice';

export default function Settings() {
  const dispatch = useDispatch();
  const { obtenerIncidencias, obtenerDetalleIncidencia } = useIncidencias();

  const { incidencias, incidencia } = useSelector((state) => state.incidencia);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    obtenerIncidencias();
  }, []);

  useEffect(() => {
    if (incidencia) {
      onOpen();
    }
  }, [incidencia]);

  const handleDetalleIncidenciaClick = (idIncidencia) => {
    obtenerDetalleIncidencia({ idIncidencia });
  };

  const handleOnClose = () => {
    dispatch(setDetalleIncidencia({ incidencia: null }));
    onClose();
  };

  return (
    <>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: '20px', xl: '20px' }}
        >
          {incidencias && incidencias.length > 0 ? (
            <DevelopmentTable
              columnsData={columnsDataDevelopment}
              tableData={incidencias}
              handleDetalleIncidenciaClick={handleDetalleIncidenciaClick}
            />
          ) : (
            <h1>Cargando incidencias...</h1>
          )}
        </SimpleGrid>
      </Box>
      {incidencia && (
        <DetalleIncidenciaModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={handleOnClose}
          incidencia={incidencia}
        />
      )}
    </>
  );
}
