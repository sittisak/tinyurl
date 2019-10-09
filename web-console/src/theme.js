import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: blue,
    },
})


export default theme