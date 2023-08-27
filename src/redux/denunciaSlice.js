import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  denuncias: [],
  isLoading: true,
  denuncia: null,
};

export const denunciaSlice = createSlice({
  name: 'denuncia',
  initialState,
  reducers: {
    setDenuncias: (state, action) => {
      state.denuncias = action.payload.denuncias;
      state.isLoading = false;
    },
    setDetalleDenuncia: (state, action) => {
      state.denuncia = action.payload.denuncia;
      state.isLoading = false;
    },
  },
});

export const { setDenuncias, setDetalleDenuncia } = denunciaSlice.actions;

export default denunciaSlice.reducer;
