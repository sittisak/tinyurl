import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Header from '../components/block/header'


const useStyles = makeStyles(theme => ({
  rootContainer: {
    padding: 0,
  },
  content: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(7),
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(10),
    }
  },
}))

const RootContainer = () => {
  const classes = useStyles()
  return (
    <Container className={classes.rootContainer} maxWidth={false}>
      <Header />
      <Container className={classes.content}  maxWidth='lg'>
        xxxx
      </Container>
    </Container>
  )
}

export default RootContainer
