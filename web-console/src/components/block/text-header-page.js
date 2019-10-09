import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'


const TextHeaderPage = ({ primary, secondary }) => {
  return (
    <Box mb={3}>
      <Typography variant="h4">{primary}</Typography>
      <Typography variant="body1" color="textSecondary" >{secondary}</Typography>
    </Box>
  )
}

export default TextHeaderPage
