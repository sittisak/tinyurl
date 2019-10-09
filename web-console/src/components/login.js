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
import Collapse from '@material-ui/core/Collapse'
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
  const [usernameSingUp, setUsernameSingUp] = React.useState('')
  const [passwordSingUp, setPasswordSingUp] = React.useState('') 
  const [errMesSingUp, setErrMesSingUp] = React.useState('') 
  const [susMesSingUp, setSusMesSingUp] = React.useState('') 
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false) 

  const singIn = () => {
    setIsLoading(true)
    setErrMes('')
    api.login(username, password).then(res => {
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

  const singUp = () => {
    setErrMesSingUp('')
    api.signup(usernameSingUp, passwordSingUp).then(res => {
      if (res.err) {
        setErrMesSingUp(res.data)
        return
      }
      setUsernameSingUp('')
      setPasswordSingUp('')
      setSusMesSingUp(`Successful created user ${usernameSingUp}`)
    })
  }

  const onKeyPressed = e => {
    if (e.key === 'Enter') {
      singIn()
    }
  }

  return (
    <Container maxWidth='xs'>
      <Paper className={classes.block} elevation={3}>
        <Paper className={classes.header}>
          <Typography className={classes.headerText} variant='h3' >
            Sign-in
          </Typography>
        </Paper>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label='Username'
              margin='normal'
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyPress={onKeyPressed}
              fullWidth/>
            <TextField
              label='Password'
              margin='normal'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyPress={onKeyPressed}
              fullWidth/>
          </Grid>
          <Grid item xs={12}>
            {errMes &&
              <Box mt={2}>
                <Typography color='error' variant='subtitle1'>
                  {errMes}
                </Typography>
              </Box>}
            <Box mt={2}>
              <Button
                variant='contained'
                color='primary'
                onClick={singIn}
                disabled={isLoading}
                fullWidth>
                {isLoading 
                  ? <CircularProgress size={25} />
                  : 'login'}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={1}>
              <Button
                color='primary'
                onClick={(e) => setIsSignUpOpen(!isSignUpOpen)} fullWidth>
                Sign up
              </Button>
            </Box>
            <Collapse in={isSignUpOpen}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label='Username for register'
                    margin='normal'
                    value={usernameSingUp}
                    onChange={e => setUsernameSingUp(e.target.value)}
                    fullWidth/>
                  <TextField
                    label='Password for register'
                    margin='normal'
                    type='password'
                    value={passwordSingUp}
                    onChange={e => setPasswordSingUp(e.target.value)}
                    fullWidth/>
                </Grid>
                <Grid item xs={12}>
                  {errMesSingUp &&
                    <Box mt={2}>
                      <Typography color='error' variant='subtitle1'>
                        {errMesSingUp}
                      </Typography>
                    </Box>}
                  {susMesSingUp &&
                    <Box mt={2}>
                      <Typography color='textSecondary' variant='subtitle1'>
                        {susMesSingUp}
                      </Typography>
                    </Box>}
                  <Box mt={2}>
                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={singUp}
                      fullWidth>
                        Sign-up
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Login
