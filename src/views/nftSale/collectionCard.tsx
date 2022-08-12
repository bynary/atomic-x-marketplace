import { Grid, Skeleton, Typography } from '@mui/material'
import Collection from 'classes/collection'

export interface collectionCardProps{
    collection: Collection
}
  
  export default function CollectionCard (props:collectionCardProps){
    
    return (
        <div>
            <Grid container sx={{":hover": {
                    boxShadow: 8,
                    backgroundColor: "rgb(255,255,255,0.2)"
                }}}>
                <Grid item
                    xs={4} sm={4} md={4} lg={4} xl={4}>
                    {props.collection ? (
                        <img src={ props.collection.icon_url } alt={ `${props.collection.name} Collection Image` } width="50px" />
                    ) : (
                        <Skeleton variant="rectangular" width={50} height={50} />
                    )
                    }
                </Grid>
                <Grid item
                    xs={8} sm={8} md={8} lg={8} xl={8}>
                    <Typography align='left' variant='overline' sx={{color: "#e1e1e0"}}>
                        { props.collection.name }
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
  }