import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import DefaultAuth from 'layouts/auth/Default';
// Assets
import illustration from 'assets/img/auth/authuagrm.jpg';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import useAuth from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setMessage } from 'redux/messageSlice';

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('blue.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorBrand = useColorModeValue('blue.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [code, setCode] = useState(null);
  const [password, setPassword] = useState(null);
  const { signin, isLoading } = useAuth();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!code || code === '' || !password || password === '') {
      dispatch(
        setMessage({
          message: 'Debe ingresar el código y la contraseña.',
          status: 'warning',
        })
      );
      return;
    }
    const userPayload = {
      code,
      password,
    };
    signin({ user: userPayload });
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Iniciar sesión
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            ¡Ingresa tu código y contraseña para iniciar sesión!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <Flex align="center" mb="25px"></Flex>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Código<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              onChange={(event) => setCode(event.target.value)}
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: '0px', md: '0px' }}
              type="email"
              placeholder="Ingrese su código"
              mb="24px"
              fontWeight="500"
              size="lg"
              disabled={isLoading}
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Contraseña<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                onChange={(event) => setPassword(event.target.value)}
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? 'text' : 'password'}
                variant="auth"
                disabled={isLoading}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: 'pointer' }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent="right" align="center" mb="24px">
              <NavLink to="/auth/forgot-password">
                <Text
                  color={textColorBrand}
                  fontSize="sm"
                  w="170px"
                  fontWeight="500"
                >
                  ¿Olvidaste la contraseña?
                </Text>
              </NavLink>
            </Flex>
            <Button
              isLoading={isLoading}
              loadingText="Iniciando sesión..."
              onClick={() => handleLogin()}
              fontSize="sm"
              variant="brand"
              background='blue.700'
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
            >
              Iniciar sesión
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
