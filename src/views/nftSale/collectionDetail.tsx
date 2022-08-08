import { Grid, Typography } from '@mui/material'
import Collection from 'classes/collection'

export interface collectionDetailProps{
  collection: Collection
}

export default function CollectionDetail (props:collectionDetailProps){
    return(
        <div>
            <Grid container sx={{":hover": {
                    boxShadow: 8,
                    backgroundColor: "rgb(255,255,255,0.2)"
                }}}>
                <Grid item
                    xs={4} sm={4} md={4} lg={4} xl={4}>
                    <img src={ props.collection.collection_image_url } width="50px" />
                </Grid>
                <Grid item
                    xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Typography align='left' variant='overline' sx={{color: "#e1e1e0"}}>
                        { props.collection.description }
                    </Typography>
                </Grid>
            </Grid>
        </div>
      )
}