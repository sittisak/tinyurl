import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import api from '../../utils/web-api'
import localState from '../../utils/local-state'


const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}))

const Header = () => {
  const classes = useStyles()

  const handlelogout = () => {
    api.logout().then((res) => {
      localState.clean()
      window.location.href = '/'
    })
  }
  return (
		<AppBar position="static">
			<Toolbar>
        <Typography className={classes.title} variant="h6" >
          Console Tinyurl
        </Typography>
        <Button 
          color="inherit"
          onClick={handlelogout}>
            Logout
          </Button>
			</Toolbar>
		</AppBar>
  )
}

export default Header

