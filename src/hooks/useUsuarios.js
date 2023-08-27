import { useDispatch, useSelector } from 'react-redux';
import {  usuariosGET } from '../services/splitApis';
import { setMessage } from 'redux/messageSlice';
import { useState } from 'react';
import { setUsuarios } from 'redux/userSlice';
import { setDetalleDenuncia } from 'redux/denunciaSlice';

const useUsuarios = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { usuarios } = useSelector((state) => state.usuario);
  const { message } = useSelector((state) => state.message);

  const obtenerUsuarios = async () => {
    try {
      setIsLoading(true);
      const { data, errorMessage } = await usuariosGET();
      if (errorMessage) {
        setIsLoading(false);
        dispatch(setMessage({ message: errorMessage, status: 'error' }));
        return;
      }
      if (data) {
        dispatch(setUsuarios({ usuarios: data }));
      }
    } catch (e) {
      setIsLoading(false);
      dispatch(setMessage({ message: e.message }));
    }
  };

 

  return {
    obtenerUsuarios,
    usuarios,
    isLoading,
    message,
  };
};

export default useUsuarios;
