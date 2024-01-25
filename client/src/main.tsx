import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './store/index';
import App from './App.tsx';
import { SocketProvider } from './context/Socket';
import { NavigationProvider } from './context/Navigation/index.tsx';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <NavigationProvider>
                <SocketProvider>
                    <App />
                </SocketProvider>
            </NavigationProvider>
        </Provider>
    </React.StrictMode>
);
