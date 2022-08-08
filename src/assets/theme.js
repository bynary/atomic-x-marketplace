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
          backgroundColor: "#000",
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
            width: "12px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
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