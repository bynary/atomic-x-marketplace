import * as React from 'react'
import { ethers } from 'ethers'
import { Card, CardActionArea, CardContent, CardMedia, Grid, Tooltip, Typography } from '@mui/material'
import CardDetail from './nftCardDetail'
import CardSkeleton from './cardSkeleton'
import eth_icon from 'assets/images/ethereum_icon_gray.png'

export interface nftCardProps{
  item: any|null|undefined,
  showCardInfo: (item: any) => void,
  clearCardInfo: () => void,
  handleSuccessfulBuy: (id: any) => void
}

export default function NftCard (props:nftCardProps){
  const [show, showDetail] = React.useState<boolean>(false)

  const showCard = (e: React.MouseEvent<HTMLDivElement>) =>{
    e.preventDefault()
    showDetail(true)
  }

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    props.showCardInfo(props.item)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // Do nothing
  }

  const onDetailClose = () => {
    showDetail(false)
  }  
  
  const price = () => {
    if(props.item && props.item.buy){
      return ethers.utils.formatUnits(props.item.buy.data.quantity, props.item.buy.data.decimals)
    } 
  }

  if (props.item.sell.data.properties) {
    return(
      <div>
        <CardActionArea>
          <Card 
            elevation={ 2 }
            sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '325px', ":hover": {
              boxShadow: 8,
            }}}
            onClick={showCard}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <Tooltip title="Click for Detail" placement="bottom">
              <CardMedia
                component="img"
                image={ props.item.sell.data.properties.image_url }
                alt={ props.item.sell.data.properties.name }
                sx={{ padding: '8px' }}
              >
              </CardMedia>
            </Tooltip>
            <CardContent>
              <Grid container
                direction="row">
                <Grid item marginRight="20px">
                  <Typography variant="body2" color="text.secondary" align='right'>  
                    #{ props.item.sell.data.token_id }
                  </Typography>
                </Grid>
                <Grid item textAlign="right">
                  <Typography variant="body2" color="text.secondary" align='right'>  
                    { price() } <img src= { eth_icon } height="12px" alt="Ethereum Cryptocurrency Icon" />
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </CardActionArea>
        <CardDetail 
          id={props.item.id}
          order={props.item}
          show={show}
          onClose={onDetailClose}
          handleSuccessfulBuy={props.handleSuccessfulBuy}
        ></CardDetail>
      </div>
    )
  }
  else {
    return (
      <div>
        <CardSkeleton />
      </div>
    )
  }
}