import axios from 'axios';

const apiUrl = () => {
  const prefix = process.env.REACT_APP_USE_HTTPS == true ? 'https' : 'http';
  if (process.env.REACT_APP_USE_PORT) {
    return `${prefix}://${process.env.REACT_APP_API}:${process.env.REACT_APP_USE_PORT}/api/${process.env.REACT_APP_API_VERSION}/`;
  } else {
    return `${prefix}://${process.env.REACT_APP_API}/api/${process.env.REACT_APP_API_VERSION}/`;
  }
};

export const incidentsApi = axios.create({
  baseURL: apiUrl(),
  timeout: 200000,
  headers: {
    agente: 110,
    token: '',
  },
  // auth: process.env.AUTH,
});

incidentsApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.token = token;
    }
    // console.log(`interceptor incidentsApi config
    //   baseURL: ${JSON.stringify(config.baseURL, null, 4)}
    //   method: ${JSON.stringify(config.method, null, 4)}
    //   url: ${JSON.stringify(config.url, null, 4)}
    //   headers: ${JSON.stringify(config.headers, null, 4)}
    // `)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
