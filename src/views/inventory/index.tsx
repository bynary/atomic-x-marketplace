import * as React from 'react'
import { ImmutableAssetStatus } from '@imtbl/imx-sdk'
import { useAppSelector } from 'store/hooks'
import ImxClient from 'services/imxClient'
import ItemCard from './itemCard'
import { Alert, Grid, Stack } from '@mui/material'
import { selectNetwork } from 'store/network/networkSlice'
import { selectUser } from 'store/profile/profileSlice'

export default function Inventory(){
  const selectedNetwork = useAppSelector(selectNetwork)
  const user = useAppSelector (selectUser)
  const [assets, setAssets] = React.useState<any[]|null>(null)
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false)

  async function loadAssets(){
    const imx = await ImxClient()
    let assetCursor
    let remaining = 0
    let results: any[] = []

    do {
      try{
        let assetResponse: any = await imx.client.getAssets(
          {
            user: user?.walletAddress || '', 
            cursor: assetCursor, 
            status: ImmutableAssetStatus.imx, 
            collection: selectedNetwork?.equipmentContractAddress, 
            sell_orders: true 
          })
        results = results.concat(assetResponse.result)
        assetCursor = assetResponse.cursor
        remaining = assetResponse.remaining
      }
      catch(e){
        console.log('getAssets error', e)
        assetCursor = false
      }
    } while (remaining > 0)

    for(let asset of results){
        asset.isListed = false
      if(asset.orders?.sell_orders?.length > 0){
        asset.isListed = true
        }
    }

    setAssets(results)
  }

  async function load(){
    if(!isLoaded){
      if(user?.isConnected){
        await loadAssets()
      }
      setIsLoaded(true)
    }
  }

  React.useEffect(() => {
    load()
  })

  const message = () => {
    if(!user?.isConnected){
      return (<Stack sx={{ width: '100%', marginBottom: '5px' }} spacing={2}>
        <Alert severity="warning">Connect a wallet to see your inventory</Alert>
      </Stack>
      )
    }
  }

  return (
    <div>
      {message()}
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 6, sm: 8, md: 12 }} direction="row" justifyContent="center" alignItems="stretch">
        {assets?.map((item, i) => (
          <Grid item xs={2} sm={2} md={2} lg={2} xl={2} key={i}>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>

    </div>
  )
}