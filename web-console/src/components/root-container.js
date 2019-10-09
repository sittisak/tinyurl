import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Header from '../components/block/header'
import Grid from '@material-ui/core/Grid'
import TextHeaderPage from '../components/block/text-header-page'
import TinyurlItem from '../components/block/tinyurl-item'
import CreateTinyurl from '../components/block/create-tinyurl'
import api from '../utils/web-api'


const useStyles = makeStyles(theme => ({
  rootContainer: {
    padding: 0,
  },
  content: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(9),
      marginBottom: theme.spacing(15),
    }
  },
}))

const RootContainer = (props) => {
  const classes = useStyles()
  const [allTinyurl, setAllTinyurl] = React.useState([])

  const fetchAllTinyurl = () => {
    api.getListTinyurl().then((res) => {
      setAllTinyurl(res.data)
    })
  }

  React.useEffect(() => {
    fetchAllTinyurl()
  }, [])

  return (
    <Container className={classes.rootContainer} maxWidth={false}>
      <Header />
      <Container className={classes.content}  maxWidth='lg'>
        <Grid container>
          <Grid item xs={12}>
            <TextHeaderPage 
              primary={`Hi, ${props.initState.username}`}
              secondary='Keep your good work.'/>
          </Grid>
          <Grid item xs={12}>
            <CreateTinyurl fetchAllTinyurl={fetchAllTinyurl} />
          </Grid>
          <Grid item xs={12}>
            {allTinyurl.map(tinyurl => (
              <TinyurlItem key={tinyurl.slug} tinyurl={tinyurl} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export default RootContainer
