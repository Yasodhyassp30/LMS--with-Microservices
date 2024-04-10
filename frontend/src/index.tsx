import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import combinedReducers from './reducers/authreducer/combinedReducers';
import { Provider } from 'react-redux';
import { classApi } from './reducers/classReducer/classApis';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const store = configureStore({
  reducer: combinedReducers,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(classApi.middleware).concat((middlewareAPI) => (next) => (action: any) => {
     
        
        const user = JSON.parse(localStorage.getItem('user') as string);
        console.log(user);
        if (user) {
          action.headers = {
            ...action.headers,
            Authorization: `Bearer ${user.token}`,
          };
        }
      
      return next(action);
    }),
});
export type AppDispatch = typeof store.dispatch ;
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
