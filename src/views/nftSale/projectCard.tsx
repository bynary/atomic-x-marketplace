import * as React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Grid, Tooltip, Typography } from '@mui/material'

export interface projectCardProps{
  item: any|null|undefined
}

export default function NftCard (props:projectCardProps){
    return(
        <div>
          <CardActionArea>
            <Card 
              elevation={ 2 }
              sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '325px', ":hover": {
                boxShadow: 8,
              }}}
            >
              <Tooltip title="Click for Detail" placement="bottom">
                <CardMedia
                  component="img"
                  image={ props.item }
                  alt={ props.item }
                  sx={{ padding: '8px' }}
                >
                </CardMedia>
              </Tooltip>
              <CardContent>
                <Grid container
                  direction="row">
                  <Grid item marginRight="20px">
                    <Typography variant="body2" color="text.secondary" align='right'>  
                      #{ props.item }
                    </Typography>
                  </Grid>
                  <Grid item textAlign="right">
                    <Typography variant="body2" color="text.secondary" align='right'>  
                      
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </CardActionArea>
        </div>
      )
}