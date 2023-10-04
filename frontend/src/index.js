import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import SignUpScreen from './screens/SignUpScreen';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import LoginScreen from './screens/LoginScreen';

const router =  createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route path='/login' element={<LoginScreen /> }/>
    <Route path='/signup' element={<SignUpScreen /> } />
  </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
