import React from 'react'
import slugify from 'slugify'
import randToken from 'rand-token'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import LanguageIcon from '@material-ui/icons/Language'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import api from '../../utils/web-api'


const useStyles = makeStyles(theme => ({
  paper: {
    border: `2px solid ${theme.palette.primary.main}`,
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

const CreateTinyurl = (props) => {
  const classes = useStyles()
  const [slug, setSlug] = React.useState()
  const [tinyurl, setRinyurl] = React.useState('')
  const [originalUrl, setOriginalUrl] = React.useState('')
  const [errMesSlug, setErrMesSlug] = React.useState('')
  const [errMesOriginalUrl, setErrMesOriginalUrl] = React.useState('')

  const _slugify = (slug) => slugify(slug, '-')

  const handleSlugChange = (e) => {
    const tinyurl = e.target.value
      ? `http://localhost:8000/${_slugify(e.target.value)}`
      : ''
    setSlug(e.target.value)
    setRinyurl(tinyurl)
  }

  const initSlug = () => handleSlugChange({ target: { value: randToken.generate(6) }})

  const handleCreateTinyurl = (e) => {
    if(!slug) {
      setErrMesSlug('Slug is required')
      return
    }
    setErrMesSlug('')
    if(!originalUrl) {
      setErrMesOriginalUrl('Full url is required')
      return
    }
    setErrMesOriginalUrl('')
    api.createTinyurl(_slugify(slug), originalUrl).then((res) => {
      props.fetchAllTinyurl()
      initSlug()
      setOriginalUrl('')
    })
  }

  React.useEffect(() => {
    initSlug()
  }, [])


  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container>
        <Grid item xs={12} md={3}>
          <TextField
            label='Slug'
            value={slug}
            error={!!errMesSlug}
            helperText={errMesSlug}
            onChange={handleSlugChange}
            margin='normal'
            fullWidth/>
          <Button onClick={handleCreateTinyurl} variant="contained" color="primary">
            Create
          </Button>
        </Grid>
        <Grid item className={classes.textContainer} xs={12} md={9}>
          <Grid container>
            <Grid item xs={12}>
            <TextField
              label='Tiny URL'
              value={tinyurl}
              disabled
              fullWidth
              margin='normal'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SwapHorizIcon />
                  </InputAdornment>
                ),
              }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Original URL'
                error={!!errMesOriginalUrl}
                helperText={errMesOriginalUrl}
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                fullWidth
                margin='normal'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LanguageIcon />
                    </InputAdornment>
                  ),
                }}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CreateTinyurl
