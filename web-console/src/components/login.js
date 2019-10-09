import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import api from '../utils/web-api'
import localStore from '../utils/local-state'


const useStyles = makeStyles(theme => ({
  block: {
    marginTop: theme.spacing(20),
    padding: theme.spacing(3, 2),
  },
  header: {
    marginTop: -theme.spacing(6),
    padding: theme.spacing(1, 1),
    width: theme.spacing(20),
    backgroundColor: theme.palette.primary.main,
  },
  headerText: {
    color: '#fff',
  },
  blockTextRes: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {

  }
}))

const Login = () => {
  const classes = useStyles()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('') 
  const [errMes, setErrMes] = React.useState('') 
  const [isLoading, setIsLoading] = React.useState(false) 

  const singIn = () => {
    setIsLoading(true)
    setErrMes('')
    api.login(username, password)
    .then(res => {
      if (res.err) {
        setErrMes(res.data)
        setPassword('')
        return res
      }
      localStore.save(res.data)
      window.location.href = window.location.pathname
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const onKeyPressed = e => {
    if (e.key === "Enter") {
      singIn()
    }
  }

  return (
    <Container maxWidth="xs">
      <Paper className={classes.block} elevation={3}>
        <Paper className={classes.header}>
          <Typography className={classes.headerText} variant="h3" >
            Sign-in
          </Typography>
        </Paper>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Username"
              margin="normal"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyPress={onKeyPressed}
              fullWidth/>
            <TextField
              label="Password"
              margin="normal"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyPress={onKeyPressed}
              fullWidth/>
          </Grid>
          <Grid item xs={12}>
            {errMes &&
              <Box mt={2}>
                <Typography color="error" variant="subtitle1">
                  {errMes}
                </Typography>
              </Box>}
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={singIn}
                disabled={isLoading}
                fullWidth>
                {isLoading 
                  ? <CircularProgress size={25} />
                  : 'login'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Login
