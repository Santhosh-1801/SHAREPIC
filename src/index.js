import {React} from 'react'
import  ReactDOM, { render }  from 'react-dom'
import "./index.css" 
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
)