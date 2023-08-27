import { Suspense, useEffect } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import { CircularProgress, useToast } from '@chakra-ui/react';
import { setMessage } from 'redux/messageSlice';
import { onMessage } from 'firebase/messaging';
import { messaging } from 'services/fcm/firebase';

const Routes = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usuario);
  const { id, message, status, description } = useSelector(
    (state) => state.message
  );

  const toast = useToast();
  console.log(`id toast ${id}`);
  if (message && message !== '') {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: message,
        description,
        status,
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    console.log('Ingresando app.js');
    onMessage(messaging, (message) => {
      console.log(
        `Recibiste un mensaje en primer plano. message: ${JSON.stringify(
          message,
          null,
          4
        )}`
      );
      toast({
        title: message.notification.title,
        description: message.notification.body,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    });

    setTimeout(() => {
      dispatch(
        setMessage({ id, message: null, description: null, status: null })
      );
    }, 800);
  }, []);

  return (
    <Suspense fallback={<CircularProgress />}>
      <HashRouter>
        {!user ? (
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Redirect from="/" to="/auth" />
          </Switch>
        ) : (
          <Switch>
            <Route path={`/panel`} component={AdminLayout} />
            <Route path={`/incidencias`} component={AdminLayout} />
            <Route path={`/denuncias`} component={AdminLayout} />
            <Route path={`/seguridad`} component={AdminLayout} />
            <Route path={`/operativa`} component={AdminLayout} />

            <Redirect from="/" to="/panel/control" />
          </Switch>
        )}
      </HashRouter>
    </Suspense>
  );
};

export default Routes;
