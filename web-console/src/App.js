import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles' 
import theme from './theme'
import Loading from './components/loading'
import Login from './components/login'
import RootContainer from './components/root-container'


const App = ({ initState }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <RootContainer initState={initState} />
    </MuiThemeProvider>
  )
}

const LoginApp = () => (
  <MuiThemeProvider theme={theme}>
    <Login />
  </MuiThemeProvider>
)

const LoadingApp = () => (
  <MuiThemeProvider theme={theme}>
    <Loading />
  </MuiThemeProvider>
)

export { LoadingApp, LoginApp }

export default App
