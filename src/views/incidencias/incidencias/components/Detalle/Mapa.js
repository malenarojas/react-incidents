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
  Image,
  Wrap,
  WrapItem,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  StackDivider,
  Select,
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

const Mapa = ({ incidencia }) => {
  const lati = incidencia.latitudDispositivo;
  const longi = incidencia.longitudDispositivo;
  const destiantionRef = { lat: lati, lng: longi };
  const dispatch = useDispatch();
  const fechaI = incidencia.createdAt;
  const fecha = new Date(fechaI).toLocaleString();

  function formatFechaNormal(fechaISO) {
    const fechaNormal = new Date(fechaISO).toLocaleString();
    return fechaNormal;
  }
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [montoTotal, setMontoTotal] = useState('');
  const habilitado = useRef(null);
  const idIncidencia = useRef(null);
  const idTipoSancion = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí creas el array con los datos ingresados
    const datos = {
      idIncidencia: parseInt(idIncidencia.current.value, 10), // 10 es la base numérica (base 10 para valores decimales)
      descripcion: descripcion,
      montoTotal: parseInt(montoTotal, 10), // Si montoTotal también es un número decimal
      habilitado: habilitado.current.value, // Convertir a booleano si habilitado es un campo booleano (true/false)
      idTipoSancion: parseInt(idTipoSancion.current.value, 10),
    };

    // Aquí realizarías la solicitud POST para enviar los datos al servidor
    // Ejemplo con fetch API:
    fetch('http://localhost:3001/api/v1/sancion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        // Aquí puedes manejar la respuesta del servidor si es necesario
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
        // Aquí puedes manejar el error si ocurre algún problema con la solicitud
      });
  };
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
          <Tab>Sanción</Tab>
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
                      desc={incidencia.descripcion}
                    />
                    <FeatureCardBody
                      title="Procedimiento"
                      desc={incidencia.procedimiento}
                    />

                    <FeatureCardBody
                      title="Infractor"
                      desc="Eliot German Humerez Aguirre"
                    />
                    <FeatureCardBody title="Fecha" desc={fecha} />

                    <Wrap spacing="1rem">
                      {incidencia.medias &&
                        incidencia.medias.map((media, index) => (
                          <WrapItem key={index}>
                            <Image
                              src={media.url}
                              alt={`Incidencia ${index + 1}`}
                              borderRadius="lg"
                              height="250px"
                              width="250px"
                              boxShadow="md"
                            />
                          </WrapItem>
                        ))}
                    </Wrap>
                  </Stack>
                </Box>
              </Card>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box position="absolute" left={0} top={20} h="100%" w="50%">
              <Card>
                <Box p={5} shadow="md" borderWidth="1px">
                  {incidencia.sancion ? (
                    <Stack divider={<StackDivider />} spacing={4}>
                      <FeatureCardBody
                        title="Descripción"
                        desc={incidencia.sancion.descripcion}
                      />
                      <FeatureCardBody
                        title="Tipo Sancion"
                        desc={incidencia.sancion.tipoSancion.nombre}
                      />

                      <FeatureCardBody
                        title="Fecha de la Sanción"
                        desc={formatFechaNormal(incidencia.sancion.createdAt)}
                      />
                    </Stack>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={3}>
                        <Text mb="8px">Descripción:</Text>
                        <Input
                          variant="flushed"
                          placeholder="Descripcion"
                          value={descripcion}
                          onChange={(e) => setDescripcion(e.target.value)}
                        />
                        <Text mb="8px">Monto Total:</Text>
                        <Input
                          variant="flushed"
                          placeholder="Monto Total"
                          value={montoTotal}
                          onChange={(e) => setMontoTotal(e.target.value)}
                        />
                        <Text mb="8px">Seleccione Tipo de Sanción</Text>
                        <Select
                          variant="flushed"
                          ref={idTipoSancion}
                          placeholder="Tipo Sanción"
                        >
                          <option value="1">Advertencia</option>
                          <option value="2">Trabajo Comunitario</option>
                          <option value="3">
                            Multa Administrativa Estudiantes
                          </option>
                          <option value="4">
                            Multa Administrativa Docentes
                          </option>
                          <option value="5">
                            Multa Administrativa Administrativos
                          </option>
                          <option value="6">
                            Multa Administrativa Foráneos
                          </option>
                          <option value="7">
                            Suspensión Temporal Estudiantes
                          </option>
                          <option value="8">
                            Suspensión Temporal Docentes o Administrativos
                          </option>
                          <option value="9">
                            Derivación al Tribunal de Justicia Universitaria
                          </option>
                        </Select>

                        <Input type="hidden" ref={habilitado} value="true" />

                        <Input
                          type="hidden"
                          ref={idIncidencia}
                          value={incidencia.idIncidencia}
                        />
                        <Button type="submit">Enviar</Button>
                      </Stack>
                    </form>
                  )}
                </Box>
              </Card>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box position="absolute" center={0} top={20} h="90%" w="70%">
              <GoogleMap
                center={destiantionRef}
                zoom={17}
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
};

export default Mapa;
