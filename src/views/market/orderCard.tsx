import * as React from 'react'
import { ethers } from 'ethers'
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import OrderDetail from './orderDetail'
import eth_icon from 'assets/images/ethereum_icon_white.png'

export default function OrderCard (props:any){
  const [order, setOrder] = React.useState<any|null>(null)
  const [show, showDetail] = React.useState<boolean>(false)

  React.useEffect(() => {
    setOrder(props.item)
  },[props.item])

  const price = () => {
    if(order && order.buy){
      return ethers.utils.formatUnits(order.buy.data.quantity, order.buy.data.decimals)
    } 
  }

  const showCard = (e: React.MouseEvent<HTMLDivElement>) =>{
    e.preventDefault()
    showDetail(true)
  }

  const onDetailClose = () => {
    showDetail(false)
  }

  return(
  <div>
    <Card 
      elevation={ 4 }
      sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '325px'}}
    >
      <CardActionArea>
        <CardMedia
          onClick={showCard}
          component="img"
          width="100%"
          image={ order?.sell.data.properties.image_url }
          alt={order?.sell.data.properties.name}
        >
        </CardMedia>
      </CardActionArea>
      <CardContent>
          <Box sx={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)'}}>
            <Typography variant="body2" color="text.secondary">
              #{ order?.sell.data.token_id }
            </Typography>
            <Typography variant="body2" color="text.secondary" align="right">
              { price() } <img src= { eth_icon } height="12px" alt="Ethereum Cryptocurrency Icon" />
            </Typography>
        </Box>
      </CardContent>
    </Card>
    <OrderDetail 
      id={order?.id}
      order={order}
      show={show}
      onClose={onDetailClose}
    ></OrderDetail>
  </div>
  )
}