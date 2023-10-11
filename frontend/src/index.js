import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Profile from './components/Profile';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SignUpScreen from './screens/SignUpScreen';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import LoginScreen from './screens/LoginScreen'; 
import HomeScreen from './screens/HomeScreen';

const router =  createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route path='/login' element={<LoginScreen /> }/>
    <Route path='/signup' element={<SignUpScreen /> } />
    <Route path='/profile' element={<Profile />} />
    <Route path='' element={<HomeScreen/>}>
      
    </Route>
  </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
