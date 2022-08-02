
import { Box, Container, Grid } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading(){
  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Box sx={{ width: '100%' }}>
          <LinearProgress color='info' />
        </Box>
      </Grid>
    </Container>
  )
}