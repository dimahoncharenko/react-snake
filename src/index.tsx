/** @jsxRuntime classic */
/** @jsx jsx */

import { Fragment } from "react";
import { Global, jsx } from "@emotion/react";
import ReactDOM from 'react-dom';

import App from './App';
import globalStyles from "./styles/globalStyles";

ReactDOM.render(
    <Fragment>
      <Global styles={globalStyles}/>
      <App />
    </Fragment>,
  document.getElementById('root')
);

