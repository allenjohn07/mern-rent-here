import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import router from './Router/Router.jsx'
import { RouterProvider } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <PrimeReactProvider>
    <GoogleOAuthProvider clientId={GoogleClientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </PrimeReactProvider>,
)

