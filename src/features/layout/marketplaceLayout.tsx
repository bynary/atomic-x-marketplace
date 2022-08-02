import { Outlet } from 'react-router'
import { Container } from '@mui/material'
import AppBar from 'features/layout/appBar'
import Footer from 'features/layout/footer'

export default function MarketplaceLayout(){
  return (
    <Container maxWidth={ false } disableGutters>
      <Container maxWidth={false} disableGutters sx={{ display: 'flex', minHeight: '10vh', flexDirection: 'column', position: 'static' }}>
        <AppBar />
      </Container>
      <Container maxWidth={ false }>
        <Outlet/>
      </Container>
      <Container maxWidth={ false } disableGutters sx={{ display: 'flex', flexDirection: 'column', position: 'absolute', bottom: 0 }}>
        <Footer/>
      </Container> 
    </Container>
  )
}