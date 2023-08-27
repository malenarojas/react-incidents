// Chakra imports
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import Mapa from 'views/detalle_denuncias/components/Mapa';


export default function Settings() {
  // Chakra Color Mode

  const list = [""]
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
      
        <Mapa
          
        />
      </SimpleGrid>
    </Box>
  );
}
