import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/userSlice';
import {
  enviarTokenNotificacionPOST,
  logoutPOST,
  signinPOST,
} from '../services/splitApis';
import { setMessage } from 'redux/messageSlice';
import { useState } from 'react';

const useAuth = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.usuario);
  const { message } = useSelector((state) => state.message);

  const signin = async ({ user }) => {
    try {
      setIsLoading(true);
      const { data, errorMessage } = await signinPOST({
        user,
      });
      if (errorMessage) {
        setIsLoading(false);
        dispatch(setMessage({ message: errorMessage, status: 'error' }));
        return;
      }
      if (data) {
        localStorage.setItem('usuario', JSON.stringify(data));
        dispatch(login({ user: data, token: data.jwt }));
      }
    } catch (e) {
      setIsLoading(false);
      dispatch(setMessage({ message: e.message }));
    }
  };

  const signout = async () => {
    try {
      setIsLoading(true);
      const { data, errorMessage } = await logoutPOST();
      if (!data && errorMessage) {
        setIsLoading(false);
        dispatch(logout());
      }
    } catch (e) {
      setIsLoading(false);
      dispatch(setMessage({ message: e.message }));
    }
  };

  const enviarTokenNotificacion = async ({ tokenNotificacion }) => {
    try {
      setIsLoading(true);
      const userObject = JSON.parse(localStorage.getItem('usuario'));
      // const userObject = localStorage.getItem('usuario');
      if (!userObject) {
        throw new Error('Inicie sesión nuevamente.');
      }
      console.log(`userObject: ${JSON.stringify(userObject, null, 4)}`);
      const jwt = userObject.jwt;
      const { data, errorMessage, message } = await enviarTokenNotificacionPOST(
        {
          jwt,
          tokenNotificacion,
        }
      );
      if (errorMessage) {
        setIsLoading(false);
        dispatch(setMessage({ message: errorMessage, status: 'error' }));
        return;
      }
      if (data) {
        console.log(`data message: ${message}`);
      }
    } catch (e) {
      console.error(
        `error enviarTokenNotificacion: ${JSON.stringify(e.message, null, 4)}`
      );
      setIsLoading(false);
      dispatch(setMessage({ message: e.message }));
    }
  };

  return {
    user,
    signin,
    signout,
    enviarTokenNotificacion,
    isLoading,
    message,
  };
};

export default useAuth;
