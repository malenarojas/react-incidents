import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import UserSliceReducer, { userSlice } from './userSlice';
import MessageSliceReducer, { messageSlice } from './messageSlice';
import IncidenciaSliceReducer, { incidenciaSlice } from './incidenciaSlice';
import DenunciaSliceReducer, { denunciaSlice } from './denunciaSlice';


const store = configureStore({
  reducer: {
    [userSlice.name]: UserSliceReducer,
    [messageSlice.name]: MessageSliceReducer,
    [incidenciaSlice.name]: IncidenciaSliceReducer,
    [denunciaSlice.name]: DenunciaSliceReducer,
  },
});

setupListeners(store.dispatch);

export default store;
