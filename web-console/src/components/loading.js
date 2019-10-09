import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  }
}))

const Loading = () => {
  const classes = useStyles()
  return (
    <Grid 
      container
      justify="center"
      alignItems="center"
      className={classes.container}>
      <Grid item>
        <CircularProgress size={150} />
      </Grid>
    </Grid>
  )
}


export default Loading
