import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  incidencias: [],
  isLoading: true,
  incidencia: null,
};

export const incidenciaSlice = createSlice({
  name: 'incidencia',
  initialState,
  reducers: {
    setIncidencias: (state, action) => {
      state.incidencias = action.payload.incidencias;
      state.isLoading = false;
    },
    setDetalleIncidencia: (state, action) => {
      state.incidencia = action.payload.incidencia;
      state.isLoading = false;
    },
  },
});

export const { setIncidencias, setDetalleIncidencia } = incidenciaSlice.actions;

export default incidenciaSlice.reducer;
