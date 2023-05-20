import React,{createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import CarStore from './store/CarStore';
import wsStore from "./store/WsStrore";

export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<Context.Provider value={{
  user:new UserStore(),
  car: new CarStore(),
  wssock: new wsStore()
}}>

  <App />
  </Context.Provider>
);

