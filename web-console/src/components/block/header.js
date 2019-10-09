import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}))

const Header = (props) => {
  const classes = useStyles()
  return (
		<AppBar position="static">
			<Toolbar>
        <Typography className={classes.title} variant="h6" >
          Console Tinyurl
        </Typography>
        <Button 
          color="inherit"
          // onClick={props.profileActions.logout}
          >
            Logout
          </Button>
			</Toolbar>
		</AppBar>
  )
}

export default Header

