// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/400.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'
import '@fontsource/rajdhani/300.css'
import '@fontsource/rajdhani/400.css'
import '@fontsource/rajdhani/500.css'
import '@fontsource/rajdhani/700.css'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: '"Rajdhani", "sans-serif"'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#000"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#64a7d9",
          color: '#000',
          '&:hover': {
            backgroundColor: '#2c85c9',
            color: '#fff'
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: 'lightgray'
        }
      }
    }
  },
  palette: {
   mode: 'light',
  //   primary: {
  //     main: '#556cd6',
  //   },
  //   secondary: {
  //     main: '#19857b',
  //   },
    // error: {
    //   main: red.A400,
    // },
    // text: {
    //   primary: '#ffffff',
    //   secondary: '#00A5E0'
    // },
    
  },
})

export default theme