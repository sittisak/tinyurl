import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import initState from './utils/init-state'
import App, { LoadingApp, LoginApp } from './App'
import * as serviceWorker from './serviceWorker'


const root = () => document.getElementById('root')

ReactDOM.render(<LoadingApp />, root())

const loadState = async () => {
  const state = await initState()
  if (state) {
    ReactDOM.render(<App initState={state} />, root())
    return true
  }
  window.location.hash = 'login'
  ReactDOM.render(<LoginApp />, root())
}

loadState()


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
