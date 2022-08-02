import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Config from 'config'
import { NavLink } from 'react-router-dom'
import { Box, Button, Container, Grid, Typography, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login = () => {
  let navigate = useNavigate()
  let location = useLocation()
  // Fix for bug #8503 in react-router introduced in 6.2.1
  // https://github.com/remix-run/react-router/issues/8503
  const state = location.state as { from: Location }

  function onHandleReturn(e: React.MouseEvent<HTMLAnchorElement>):void{
    e.preventDefault()

    navigate(-1)
  }

  function onLoginAzure(){
    let path = Config.loginPath
    if(state && state.from){
      const redirectTo = `${window.location.origin}${state.from}`
      path =  `${path}?post_login_redirect_uri=${redirectTo}`
    }
    
    window.location.href=path
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
       sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
          mx: 'auto',
          width: '500px'
        }}
    >
     
        <Container maxWidth="sm">
          <NavLink
            to="/"
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              onClick={onHandleReturn}
            >
              Return
            </Button>
          </NavLink>
          
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Authentication Required
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                You have requested a protected page.  Please login to continue.
              </Typography>
            </Box>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
              >
                <Button
                  color="info"
                  fullWidth
                  onClick={onLoginAzure}
                  size="large"
                  variant="contained"
                >
                  Login
                </Button>
              </Grid>
              
            </Grid>
        </Container>
    </Stack>
  );
};

export default Login;
// import { useLocation, useParams } from 'react-router-dom'

// import Config from 'config'

// export default function Login(){
//   let location = useLocation()

//   function handleClick(){
//     let path = Config.loginPath
    
//     if(location.state.from){
//       const redirectTo = `${window.location.origin}${location.state.from}`
//       path =  `${path}?post_login_redirect_uri=${redirectTo}`
//     }
    
//     window.location.href=path
//   }

//   return(
//     <div>
//       Do login here: From:  {location.state.from}
//       <button type="button" onClick={handleClick}>Login</button>
//     </div>
//   )
// }