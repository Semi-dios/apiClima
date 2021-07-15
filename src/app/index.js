import React from 'react'
import {render} from 'react-dom'
import App from './App'
import { DBConfig } from './DBConfig';
import { initDB } from 'react-indexed-db';

initDB(DBConfig);
import './scss/_style.scss'



render(<App/>,document.getElementById('app'))