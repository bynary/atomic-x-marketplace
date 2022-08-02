import { useAppSelector } from 'store/hooks'
import { selectUser } from 'store/profile/profileSlice'
import { Grid, Typography } from '@mui/material'

export default function FounderStatus(){
    const user = useAppSelector (selectUser)

    let founderLabel = null

    if (user?.isFounder){
        founderLabel = 
        <Grid container marginBottom="20px">
          <Grid item xs={12} sx={{ marginTop: '8px', backgroundColor: '#70778D', borderRadius: '10px' }}>
            <Typography variant="h5" color="#fff" align="center">Thank you for being a Founder!</Typography>
          </Grid>
        </Grid>
    }
  
    return(
      founderLabel
    )
  }