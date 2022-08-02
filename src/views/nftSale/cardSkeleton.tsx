import { Card, CardContent, CardMedia, Grid, Skeleton, Typography } from '@mui/material'
import eth_icon from 'assets/images/ethereum_icon_gray.png'
import card_placeholder from 'assets/images/ut_marketplace_card_placeholder.png'

export default function CardSkeleton (){
    return(
        <div>
            <Card 
                elevation={ 2 }
                sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '325px', ":hover": {
                    boxShadow: 8,
                }}}
                >
                <Skeleton animation="pulse">
                    <CardMedia
                        component="img"
                        image={ card_placeholder }
                        alt={ 'Card Placeholder' }
                        sx={{ padding: '8px' }}
                        >
                    </CardMedia>
                </Skeleton>
                <CardContent>
                    <Grid container
                    direction="row">
                    <Grid item marginRight="20px">
                        <Typography variant="body2" color="text.secondary" align='right'>  
                            <Skeleton animation="wave" variant="text" width="20px" height="10px" />
                        </Typography>
                    </Grid>
                    <Grid item textAlign="right">
                        <Typography variant="body2" color="text.secondary" align='right'>  
                            <Skeleton animation="wave" variant="text" width="120px" height="10px" /> <img src= { eth_icon } height="12px" alt="Ethereum Cryptocurrency Icon" />
                        </Typography>
                    </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}