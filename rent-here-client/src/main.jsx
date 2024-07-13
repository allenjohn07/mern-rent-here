import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import router from './Router/Router.jsx'
import {RouterProvider} from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <PrimeReactProvider><RouterProvider router={router} /></PrimeReactProvider>,
)
