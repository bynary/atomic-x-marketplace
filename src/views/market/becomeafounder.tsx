import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import foundersDeck from 'assets/images/founders_deck.png'

export default function BecomeAFounder() {
    return (
      <Grid container 
        direction="column"
        justifyContent="center"
        alignItems="center"
        marginTop="20px">
        <Grid item>
          <Card>
            <CardMedia
              component="img"
              height="320"
              image={ foundersDeck }
              alt={ "Founders Deck" }
            />
            <CardContent>
              <Typography variant='h5'>Thank you for your interest in our Founder's Land Sale!</Typography>
              <Typography variant='h4'>To become a Founder, purchase a Founder's Card.</Typography>
            </CardContent>
            <CardActions>
              <Grid container 
                direction="column"
                justifyContent="center"
                alignItems="center"
                marginBottom="20px">
                <Grid item>
                  <Button size="large" variant="contained">Purchase Founders Card</Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
        
      )
}