// Chakra imports
import { Box, SimpleGrid } from '@chakra-ui/react';
import DevelopmentTable from 'views/seguridad/usuarios/components/DevelopmentTable';
import {
  columnsDataDevelopment,
} from 'views/seguridad/usuarios/variables/columnsData';
import tableDataDevelopment from 'views/seguridad/usuarios/variables/tableDataDevelopment.json';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUsuarios from 'hooks/useUsuarios';


export default function Settings() {
  // Chakra Color Mode
  const dispatch = useDispatch();
  const { obtenerUsuarios} = useUsuarios();

  const { usuarios} = useSelector((state) => state.usuario);

  
  useEffect(() => {
    obtenerUsuarios();
  }, []);
  const list = [""]
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
       {usuarios && usuarios.length > 0 ? (
            <DevelopmentTable
              columnsData={columnsDataDevelopment}
              tableData={usuarios}
             
            />
          ) : (
            <h1>Cargando Usuarios...</h1>
          )}
      </SimpleGrid>
    </Box>
  );
}
