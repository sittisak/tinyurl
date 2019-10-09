import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import LanguageIcon from '@material-ui/icons/Language';


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'start',
    },
  },
  icon: {
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
  }
}))

const TinyurlItem = (props) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item className={classes.textContainer} xs={12} md={3}>
          <Link
            underline='none'
            target='_blank'
            color="primary"
            href={props.tinyurl.redirectUrl}>
            {props.tinyurl.redirectUrl}
          </Link>
        </Grid>
        <Grid item className={classes.textContainer} xs={12} md={9}>
          <LanguageIcon className={classes.icon} />
          <Typography variant='body1' color='textSecondary'>
            {props.tinyurl.originalUrl}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TinyurlItem
