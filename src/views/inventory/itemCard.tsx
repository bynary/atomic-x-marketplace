import * as React from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from '@mui/material'
import ItemDetail from './itemDetail'

export default function ItemCard (props:any){
  const [show, showDetail] = React.useState<boolean>(false)

  const showCard = (e: React.MouseEvent<HTMLDivElement>) =>{
    e.preventDefault()
    showDetail(true)
  }

  const onDetailClose = () => {
    showDetail(false)
  }

  return(
  <div>
    <CardActionArea>
      <Card 
        elevation={ 2 }
        sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '325px', ":hover": {
          boxShadow: 8,
        }}}>        
        <Tooltip title="Click for Detail" placement="bottom">
            <CardMedia
              onClick={showCard}
              component="img"
              width="100%"
              image={ props.item.image_url }
              alt={ props.item.name }
              sx={{ paddingTop: '6px' }}
            >
            </CardMedia>
        </Tooltip>
        <CardContent>
          <Box>
            <Typography variant="body2" color="text.secondary">
              #{ props.item.token_id }
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
    <ItemDetail 
      id={props.item.id}
      item={props.item}
      show={show}
      onClose={onDetailClose}
    ></ItemDetail>
  </div>
  )
}