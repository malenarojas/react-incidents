import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdHome,
  MdLock,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import DataTables from 'views/admin/dataTables';
import Usuarios from 'views/seguridad/usuarios';
import Incidencias from 'views/incidencias/incidencias';
import Denuncias from 'views/denuncias';
import detalle_denuncias from 'views/detalle_denuncias';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  {
    name: 'Panel de Control',
    layout: '/panel',
    path: '/control',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    category: 'seguridad',
    name: 'Seguridad',
    items: [
      {
        name: 'Gestión de Usuarios',
        layout: '/seguridad',
        path: '/usuarios',
        icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
        component: Usuarios,
      },
   
    ],
  },
  {
    category: 'incidencia',
    name: 'Administración de Incidencias',
    items: [
      {
        name: 'Administración de Incidencias',
        layout: '/incidencias',
        path: '/incidencias',
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: Incidencias,
      },
      {
        name: 'Administración de Denuncias',
        layout: '/denuncias',
        path: '/denuncias',
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: Denuncias,
      },
    
    ],
  },

 {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
];

export default routes;
