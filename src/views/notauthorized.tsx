import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Box, Button, Container, Typography, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotAuthorized = () => {
  let navigate = useNavigate()

  function onHandleReturn(e: React.MouseEvent<HTMLAnchorElement>):void{
    e.preventDefault()
    navigate(-1)
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
          maxWidth: '400px'
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
                Not Authorized
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                You are not authorized to view the requested page.
              </Typography>
            </Box>
        </Container>
    </Stack>
  );
};

export default NotAuthorized;