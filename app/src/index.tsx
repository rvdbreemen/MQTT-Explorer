import './tracking'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import reduxThunk from 'redux-thunk'
import { batchDispatchMiddleware } from 'redux-batched-actions'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import reducers from './reducers'

import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import Demo from './components/demo'

const composeEnhancers = /*(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || */ compose
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      reduxThunk,
      batchDispatchMiddleware,
    ),
  ),
)

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

setTimeout(() => {
  const splash = document.getElementById('splash')
  if (splash) {
    splash.style.animation = 'unsplash 0.5s ease-in 0s 1 normal forwards'
    setTimeout(() => splash.remove(), 600)
  }
}, 300)

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
        <Demo />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('app'),
)
