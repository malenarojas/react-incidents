import { useDispatch, useSelector } from 'react-redux';
import { detalleDenunciaGET, denunciasGET, logoutPOST, signinPOST } from '../services/splitApis';
import { setMessage } from 'redux/messageSlice';
import { useState } from 'react';
import { setDenuncias } from 'redux/denunciaSlice';
import { setDetalleDenuncia } from 'redux/denunciaSlice';

const useDenuncias = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { denuncias } = useSelector((state) => state.denuncia);
  const { message } = useSelector((state) => state.message);

  const obtenerDenuncia = async () => {
    try {
      setIsLoading(true);
      const { data, errorMessage } = await denunciasGET();
      if (errorMessage) {
        setIsLoading(false);
        dispatch(setMessage({ message: errorMessage, status: 'error' }));
        return;
      }
      if (data) {
        dispatch(setDenuncias({ denuncias: data }));
      }
    } catch (e) {
      setIsLoading(false);
      dispatch(setMessage({ message: e.message }));
    }
  };

  const obtenerDetalleDenuncia = async ({ idDenuncia }) => {
    try {
      setIsLoading(true);
      const { data, errorMessage } = await detalleDenunciaGET({
        idDenuncia,
      });
      if (errorMessage) {
        setIsLoading(false);
        dispatch(setMessage({ message: errorMessage, status: 'error' }));
        return;
      }
      if (data) {
        dispatch(setDetalleDenuncia({ denuncia: data }));
      }
    } catch (e) {
      setIsLoading(false);
      dispatch(setMessage({ message: e.message }));
    }
  };

  return {
    obtenerDenuncia,
    obtenerDetalleDenuncia,
    denuncias,
    isLoading,
    message,
  };
};

export default useDenuncias;
