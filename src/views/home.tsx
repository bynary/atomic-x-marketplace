import { Box } from '@mui/system'
import { Grid, Typography } from '@mui/material'

export default function Home(){
  return (
    <Box sx={{ height: '50vh', width: '100%'}}>
      <Grid container
      direction="column"
      justifyContent="center"
      alignItems="center" >
        <Grid item>
          <Typography variant='h1' textAlign="center" color="white" fontFamily="Rajdhani, Sans-serif">Land Sale Opens</Typography>
          <Typography variant='h1' textAlign="center" color="white" fontWeight="500" sx={{backgroundColor: 'orange'}}>03.15.22</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}