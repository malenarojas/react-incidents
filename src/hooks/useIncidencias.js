import { useDispatch, useSelector } from 'react-redux';
import { detalleIncidenciaGET, incidenciasGET, logoutPOST, signinPOST } from '../services/splitApis';
import { setMessage } from 'redux/messageSlice';
import { useState } from 'react';
import { setIncidencias } from 'redux/incidenciaSlice';
import { setDetalleIncidencia } from 'redux/incidenciaSlice';

const useIncidencias = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { incidencias } = useSelector((state) => state.incidencia);
  const { message } = useSelector((state) => state.message);

  const obtenerIncidencias = async () => {
    try {
      setIsLoading(true);
      const { data, errorMessage } = await incidenciasGET();
      if (errorMessage) {
        setIsLoading(false);
        dispatch(setMessage({ message: errorMessage, status: 'error' }));
        return;
      }
      if (data) {
        dispatch(setIncidencias({ incidencias: data }));
      }
    } catch (e) {
      setIsLoading(false);
      dispatch(setMessage({ message: e.message }));
    }
  };

  const obtenerDetalleIncidencia = async ({ idIncidencia }) => {
    try {
      setIsLoading(true);
      const { data, errorMessage } = await detalleIncidenciaGET({
        idIncidencia,
      });
      if (errorMessage) {
        setIsLoading(false);
        dispatch(setMessage({ message: errorMessage, status: 'error' }));
        return;
      }
      if (data) {
        dispatch(setDetalleIncidencia({ incidencia: data }));
      }
    } catch (e) {
      setIsLoading(false);
      dispatch(setMessage({ message: e.message }));
    }
  };
  const asignarSancion = async ({ idIncidencia }) => {
    try {
      setIsLoading(true);
      const { data, errorMessage } = await detalleIncidenciaGET({
        idIncidencia,
      });
      if (errorMessage) {
        setIsLoading(false);
        dispatch(setMessage({ message: errorMessage, status: 'error' }));
        return;
      }
      if (data) {
        dispatch(setDetalleIncidencia({ incidencia: data }));
      }
    } catch (e) {
      setIsLoading(false);
      dispatch(setMessage({ message: e.message }));
    }
  };

  return {
    obtenerIncidencias,
    obtenerDetalleIncidencia,
    incidencias,
    isLoading,
    message,
  };
};

export default useIncidencias;
