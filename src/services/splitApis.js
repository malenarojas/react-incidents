import { incidentsApi } from './configApi';

const signinPOST = async ({ user }) => {
  let errorMessage,
    data = null;
  try {
    let response = await incidentsApi.post('/users/signin', {
      // headers: {
      //   token,
      // },
      codigo: user.code,
      contrasena: user.password,
    });
    if (!response.data.data) errorMessage = response.data.message;
    else data = response.data.data;
  } catch (e) {
    errorMessage = e.message;
  }
  return {
    errorMessage,
    data,
  };
};

const logoutPOST = async () => {
  let errorMessage,
    data = null;
  try {
    let response = await incidentsApi.post('/users/logout');
    if (!response.data.data) errorMessage = response.data.message;
    else data = response.data.data;
  } catch (e) {
    errorMessage = e.message;
  }
  return {
    errorMessage,
    data,
  };
};

const enviarTokenNotificacionPOST = async ({ jwt, tokenNotificacion }) => {
  let errorMessage,
    data = null,
    message;
  try {
    let response = await incidentsApi.post(
      '/notificaciones/nuevo',
      { tokenNotificacion },
      {
        headers: {
          jwt,
        },
      }
    );
    console.log(`holadiosmio: ${JSON.stringify(response, null, 4)}`);
    if (!response.data.data) errorMessage = response.data.message;
    else {
      data = response.data.data;
      message = response.data.message;
    }
  } catch (e) {
    errorMessage = e.message;
  }
  return {
    errorMessage,
    data,
    message,
  };
};

//INCIDENCIAS

const incidenciasGET = async () => {
  let errorMessage,
    data = null;
  try {
    let response = await incidentsApi.get('/incidencias');
    if (!response.data.data) errorMessage = response.data.message;
    else data = response.data.data;
  } catch (e) {
    errorMessage = e.message;
  }
  return {
    errorMessage,
    data,
  };
};

const detalleIncidenciaGET = async ({ idIncidencia }) => {
  let errorMessage,
    data = null;
  try {
    let response = await incidentsApi.get(`/incidencias/${idIncidencia}`);
    if (!response.data.data) errorMessage = response.data.message;
    else data = response.data.data;
  } catch (e) {
    errorMessage = e.message;
  }
  return {
    errorMessage,
    data,
  };
};

//DENUNCIAS

const denunciasGET = async () => {
  let errorMessage,
    data = null;
  try {
    let response = await incidentsApi.get('/denuncias');
    if (!response.data.data) errorMessage = response.data.message;
    else data = response.data.data;
  } catch (e) {
    errorMessage = e.message;
  }
  return {
    errorMessage,
    data,
  };
};

const detalleDenunciaGET = async ({ idDenuncia }) => {
  let errorMessage,
    data = null;
  try {
    let response = await incidentsApi.get(`/denuncias/${idDenuncia}`);
    if (!response.data.data) errorMessage = response.data.message;
    else data = response.data.data;
  } catch (e) {
    errorMessage = e.message;
  }
  return {
    errorMessage,
    data,
  };
};

//Usuarios

const usuariosGET = async () => {
  let errorMessage,
    data = null;
  try {
    let response = await incidentsApi.get('/usuarios');
    if (!response.data.data) errorMessage = response.data.message;
    else data = response.data.data;
  } catch (e) {
    errorMessage = e.message;
  }
  return {
    errorMessage,
    data,
  };
};


export {
  signinPOST,
  logoutPOST,
  enviarTokenNotificacionPOST,
  incidenciasGET,
  detalleIncidenciaGET,
  denunciasGET,
  detalleDenunciaGET,
  usuariosGET,
};
