import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0B3D91' },   // NASA blue
    secondary: { main: '#FF0000' }, // NASA red
    background: { default: '#121212', paper: '#1E1E1E' }
  }
})

export default theme
