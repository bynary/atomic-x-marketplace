import { Outlet } from 'react-router'
import { Box, Container } from '@mui/material'
import AppBar from './appBar'
import AppDrawer from './appDrawer'
import Footer from 'features/layout/footer'

export default function AdminLayout(){
  return (
    <Container maxWidth={ false } disableGutters sx={{display: 'flex'}}>
      <AppBar/>
      <AppDrawer/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet/>
      </Box>
      <Footer/>
    </Container>
    )
}
