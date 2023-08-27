
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Stack,
  Heading,
  Input,
  SkeletonText,
  Text,
  
} from '@chakra-ui/react'
import Card from "components/card/Card"
import NFT from "components/card/NFT"

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'


<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNkapii0zK2_ek65HSa3O_-P5hDz9qYuQ"></script>
const centro = { lat: -17.775978, lng: -63.195117 }


function Feature({ title, desc, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  )
}

function App() {

    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    })
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    if (!isLoaded) {
      return <SkeletonText />
    }
   
  return (
    <Flex 
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
      >
     <Box position='absolute' right={270} top={0} h='95%' w='60%'>
        <GoogleMap center={centro} 
                    zoom={15}
                     mapContainerStyle={{width: '100%',height: '100%'}}
                     options={{
                      zoomControl: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                    >
        
        </GoogleMap>
    </Box>
    <Box position='absolute' left={0} top={0} h='100%' w='20%'>
        <Card>
        <Stack spacing={8}>
      <Feature
        title="Descripción"
        desc="The future can be even brighter but a goal without a plan is just a wish
        You deserve good things. With a whooping 10-15% interest rate per annum,
        grow your savings on your own terms with our completely automated process"
      />
      <Feature
        title="Telefono del Contacto"
        desc="71005231"
      />
    </Stack>
        </Card>
    </Box>
    </Flex>
   
    
  );
}

export default App;
