// import "dotenv/config"
import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { Provider } from 'react-redux';
import store from './redux/store';
import Routes from 'app';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <ChakraProvider theme={theme}>
          <Routes />
        </ChakraProvider>
      </ThemeEditorProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
