import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import App from './app'
import theme from './assets/theme'
import './assets/styles/app.css'

ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  ,
  document.querySelector('#root'),
)

