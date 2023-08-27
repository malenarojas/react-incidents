import {
    Box,
    Flex,
    Icon,
    Stack,
    Button,
    Heading,
    Input,
    SkeletonText,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    TabIndicator,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    StackDivider,
  } from '@chakra-ui/react';
  import Card from 'components/card/Card';
  import NFT from 'components/card/NFT';
  import { MdDirectionsWalk } from 'react-icons/md';
  import { FaCar } from 'react-icons/fa';
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    LoadScript,
    DirectionsRenderer,
  } from '@react-google-maps/api';
  import React, { useState, useRef, useEffect } from 'react';
  import { FaLocationArrow, FaTimes } from 'react-icons/fa';
  import { setMessage } from 'redux/messageSlice';
  import { useDispatch } from 'react-redux';
  
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNkapii0zK2_ek65HSa3O_-P5hDz9qYuQ"></script>;
  const center = { lat: 0, lng: 0 };
  const destiantionRef = { lat: -17.774963, lng: -63.197642 };
  const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Select Rooms' },
  ];
  
  function Feature({ title, desc, ...rest }) {
    return (
      <Box p={5} shadow="md" borderWidth="1px" {...rest}>
        <Heading fontSize="xl">{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    );
  }

  function FeatureCardBody({ title, desc, ...rest }) {
    return (
      <Box>
        <Heading size="sm" textTransform="uppercase">
          {title}
        </Heading>
        <Text pt="2" fontSize="sm">
          {desc}
        </Text>
      </Box>
    );
  }
  
  const Mapa = ({ denuncia }) => {
   
    
    const dispatch = useDispatch();
  
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    });
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Error al obtener la ubicación:', error);
          }
        );
      } else {
        console.error('El navegador no admite la geolocalización.');
      }
    }, []);
  
    if (!isLoaded) {
      return <SkeletonText />;
    }
  
    async function calculateRoute() {
      try {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: currentLocation,
          destination: destiantionRef,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        });
  
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
      } catch (error) {
        console.error(JSON.stringify(error, null, 4));
        dispatch(setMessage({ message: error.message, status: 'warning' }));
      }
    }
  
    async function calculateRouteaPie() {
      try {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: currentLocation,
          destination: destiantionRef,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.WALKING,
        });
  
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
      } catch (error) {
        console.error(JSON.stringify(error, null, 4));
        dispatch(setMessage({ message: error.message, status: 'warning' }));
      }
    }
  
    function clearRoute() {
      setDirectionsResponse(null);
      setDistance('');
      setDuration('');
      currentLocation = '';
      destiantionRef = '';
    }
  
    return (
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="letf"
        h="100vh"
        w="100vw"
      >
        <Tabs variant="unstyled">
          <TabList>
            <Tab>Detalles</Tab>
           
            <Tab>Ubicación</Tab>
           
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="gray.500"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <Box position="absolute" left={0} top={20} h="100%" w="50%">
                <Card>
                <Box p={5} shadow="md" borderWidth="1px">
                  <Stack divider={<StackDivider />} spacing={4}>
                      <FeatureCardBody
                        title="Descripción"
                        desc={denuncia.descripcion}
                      />
                      <FeatureCardBody
                        title="Denunciante"

                        
                        desc={denuncia.idUsuario === 1 ? (
                          'Malena Rojas Camargo'
                         ) : denuncia.idUsuario === 2 ? (
                           'Eliot Germán Humerez Aguirre'
                       ): (
                         'Maria Angélica Miranda Mendoza'
                     )}
                      />
                       <FeatureCardBody
                        title="Teléfono del Contacto"
                        desc={denuncia.telefonoContacto}
                      />
                  </Stack>
                  </Box>
                </Card>
              </Box>
            </TabPanel>
           
            <TabPanel>
              <Box position="absolute" center={0} top={20} h="90%" w="70%">
                <GoogleMap
                  center={destiantionRef}
                  zoom={15}
                  mapContainerStyle={{ width: '80%', height: '100%' }}
                  options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                  }}
                  onLoad={(map) => setMap(map)}
                >
                  <Marker position={destiantionRef} />
                  {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                  )}
                </GoogleMap>
              </Box>
              <Box
                position="absolute"
                left={10}
                bottom={0}
                h="90%"
                w="70%"
                display="flex"
                gap={4}
              >
                <Input type="hidden" placeholder="Origin" ref={currentLocation} />
  
                <Input
                  type="hidden"
                  placeholder="Destination"
                  ref={destiantionRef}
                />
                <Button
                  colorScheme="blue"
                  type="submit"
                  onClick={calculateRoute}
                  leftIcon={<Icon as={FaCar} boxSize={5} />}
                >
                  Encontrar Ruta{' '}
                </Button>
  
                <Button
                  colorScheme="blue"
                  type="submit"
                  onClick={calculateRouteaPie}
                  leftIcon={<Icon as={MdDirectionsWalk} boxSize={5} />}
                >
                  Encontrar Ruta
                </Button>
              </Box>
            </TabPanel>
            
          </TabPanels>
        </Tabs>
      </Flex>
    );
  }
  
  export default Mapa;
  