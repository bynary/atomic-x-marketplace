import * as React from 'react'
import { ImmutableOrderStatus, ImmutableMethodParams } from '@imtbl/imx-sdk'
import { useAppSelector } from 'store/hooks'
import ImxClient from 'services/imxClient'
import UserService from 'services/user'
import OrderCard from './orderCard'
import { Alert, Divider, Grid, Stack } from '@mui/material'
import { User } from 'types'
import { selectNetwork } from 'store/network/networkSlice'

export default function MarketIndex(){
  const selectedNetwork = useAppSelector(selectNetwork)

  const [user, setUser] = React.useState<User|null>(null)
  const [orders, setOrders] = React.useState<any[]|null>(null)
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false)

  async function getUser(){
    const user = await UserService.getUser();
    setUser(user)
  }

  const load = React.useCallback( async() =>{
    async function loadAssets(){
      const imx = await ImxClient()
      let remaining = 0
      let cursor
      let results: any[] = []
  
      do {
        //ToDo: add paging  
        try{
        let request: any = await imx.client.getOrders({ 
          status:ImmutableOrderStatus.active, 
          sell_token_address: selectedNetwork?.contractAddress, 
          order_by:'buy_quantity', 
          direction: ImmutableMethodParams.ImmutableSortOrder.asc, 
          cursor: cursor }
        )
  
        results = results.concat(request.result)
        cursor = request.cursor
        remaining = request.remaining
        }
        catch(e){
          console.log('could not load orders',e)
          remaining = 0
        }
      } while (remaining > 0)
  
      setOrders(results)
    }

    if(!isLoaded){
      await getUser()
      await loadAssets()
      setIsLoaded(true)
    }
  },[isLoaded, selectedNetwork?.contractAddress])

  React.useEffect(() => {
    load()
  },[load])

  const message = () => {
    if(!user?.isConnected){
      return (<Stack sx={{ width: '100%', marginBottom: '5px' }} spacing={2}>
        <Alert severity="warning">Connect a wallet to purchase items from the marketplace</Alert>
      </Stack>
      )
    }
  }
  return (
    <div>
      <h1>Marketplace</h1>
       { message() }
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 9, md: 12 }} direction="row" justifyContent="center" alignItems="stretch">
        {orders?.map((item, i) => (
          <Grid item xs={2} sm={3} md={3} key={i}>
            <OrderCard item={item} />
          </Grid>
        ))}
      </Grid>
      
      <Divider flexItem={ true } sx={{padding: "5px"}}/>

      <div>{orders?.length} items</div>

    </div>
  )
}