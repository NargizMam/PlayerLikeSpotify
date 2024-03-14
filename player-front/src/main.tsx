import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {persistor, store} from "./app/store.ts";
import {ThemeProvider} from "@mui/material";
import theme from "./theme.ts";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {addInterceptors} from "./axiosApi.ts";
import {GOOGLE_CLIENT_ID} from "./constants.ts";
import { GoogleOAuthProvider } from '@react-oauth/google';

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <App/>
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </GoogleOAuthProvider>
    </Provider>
)
