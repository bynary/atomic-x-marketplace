import * as React from 'react'
import { useAppSelector } from 'store/hooks'
import { selectNetwork } from 'store/network/networkSlice'
import { selectUser } from 'store/profile/profileSlice'
import ImxClient from 'services/imxClient'
import { Alert, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Tooltip, Typography } from '@mui/material'
import { BackspaceRounded } from '@mui/icons-material'
import { ImmutableMethodParams, ImmutableOrderStatus } from '@imtbl/imx-sdk'
import ProjectCard from './projectCard'
import NftCard from './nftCard'
import CardSkeleton from './cardSkeleton'
import Asset from 'types/asset.class'
import assetApi from 'api/asset'
import _ from 'lodash'
import ScrollToTopButton from 'features/controls/scrollToTop'
import BuySuccess from './buySuccess'

export default function NftSale(){
  const selectedNetwork = useAppSelector(selectNetwork)
  const user = useAppSelector (selectUser)

  const [baseOrders, setBaseOrders] = React.useState<any[] | null>(null)
  const [orders, setOrders] = React.useState<any[]|null>(null)
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false)
  const [skeletons, setSkeletons] = React.useState<string[]>([''])

  const [isFiltered, setIsFiltered] = React.useState<boolean>(false)
  const [sortSelection, setSortSelection] = React.useState<string | null>('')

  const [cardName, setCardName] = React.useState<string>('')
  const [hideCardInfo, setHideCardInfo] = React.useState<boolean>(true)

  const [showSuccessfulBuy, setShowSuccessfulBuy] = React.useState<boolean>(false)

  const load = React.useCallback( async() =>{
    async function loadAssets(){
      const imx = await ImxClient()
      let remaining = 0
      let skeletonCount = 100
      let placeholders: string[] = ['']
      let cursor
      let results: any[] = []

      do {
        placeholders.push('')
        skeletonCount--
      } while (skeletonCount > 0)

      setSkeletons(placeholders)
  
      do {
        //ToDo: add paging  
        setIsLoaded(false)
        try{
        let request: any = await imx.client.getOrders({ 
          status:ImmutableOrderStatus.active, 
          sell_token_address: selectedNetwork?.landContractAddress, 
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
  
      results.forEach((result, index) => {  
        const asset = new Asset(result.sell.data.token_id, result.sell.data.properties.collection.name)
        assetApi.getAssetMetadata(asset).then((response) => {
          results[index].ut_metadata = response
          console.log(results[index])
        })
      })
  
      setBaseOrders(results)
      setOrders(results)
      setIsLoaded(true)
    }

    if(!isLoaded){
      //await loadAssets()
      setIsLoaded(true)
    }
  },[isLoaded,selectedNetwork?.landContractAddress])

  const handleSortSelection = (sortType: string | null) => {
    setSortSelection(sortType)

    let sortedOrders: any[]|null = []

    switch(sortType) {
      case 'h-l':
        let hlSort = orders?.sort((a, b) => a.price > b.price ? 1 : -1)
        sortedOrders = hlSort ? hlSort : orders
        break
      case 'l-h':
        let lhSort = orders?.sort((a, b) => a.price < b.price ? 1 : -1)
        sortedOrders = lhSort ? lhSort : orders
        break
      case 'a-z':
        let azSort = orders?.sort((a, b) => a.name > b.name ? 1 : -1)
        sortedOrders = azSort ? azSort : orders
        break
      case 'z-a':
        let zaSort = orders?.sort((a, b) => a.name < b.name ? 1 : -1)
        sortedOrders = zaSort ? zaSort : orders
        break
    }

    setOrders(sortedOrders)
  }

  const filterOrders = () => {
    let ordersCopy = _.cloneDeep(baseOrders)

    let filteredOrders = null

    if (filteredOrders) {
      setIsFiltered(true)
      setOrders(filteredOrders)
    }
  }

  const handleSuccessfulBuy = (id: any) => {
    if (orders && orders?.length > 0) {

      let updatedOrders = _.without(orders, function(order: any) {
        return order?.sell.data.token_id === id
      });

      setOrders(updatedOrders)
      setShowSuccessfulBuy(true)
    }
  }

  const handleSuccessfulBuyClose = () => {
    console.log("close?: ", "Yes!")
    setShowSuccessfulBuy(false)
  }

  const clearFilters = () => {
    setOrders(baseOrders)
    setIsFiltered(false)
  }

  const showCardInfo = (item: any) => {
    setCardName(item.ut_metadata?.name)
    setHideCardInfo(false)
  }

  const clearCardInfo = () => {
    setHideCardInfo(true)
    setCardName('')
  }

  const cardStyle = {
    paddingRight: '20px',
    maxHeight: '820px', 
    overflowY: 'auto'
  }

  const mapStyle = {
    height: '350px',
    marginTop: "20px",
    marginRight: "20px"
  };

  React.useEffect(() => {
    load()
  },[load])

  const message = () => {
    if(!user?.isConnected){
      return (<Grid container
              direction="column"
              justifyContent="center"
              alignItems="center">
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} marginBottom="20px">
                <Alert severity="info">Please connect your wallet to purchase NFTs.</Alert>  
              </Grid> 
            </Grid>
      )
    }
  }

  return (
    <Box>      
      <Grid container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start">
        <Grid item
          xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid container direction="row"                          
            justifyContent="center"
            alignItems="center">
            <Grid item>      
              { message() }
            </Grid>
          </Grid>
        </Grid>
        <Grid item
          xs={6} sm={6} md={4} lg={4} xl={4}>
          
        </Grid>
        <Grid item
          xs={6} sm={6} md={8} lg={8} xl={8}>
          <Grid container>
            <Grid item
              xs={12} sm={12} md={12} lg={12} xl={12}
              sx={{padding: "20px", border: '1px', backgroundColor: '#131313' }}>
                <ProjectCard item="text"/>
            </Grid>
            <Grid item
            xs={12} sm={12} md={12} lg={12} xl={12}
            sx={{padding: "20px", backgroundColor: '#131313' }}>
              <Typography align='left' variant='overline' sx={{color: "#e1e1e0"}}>
                Sort
              </Typography>
              <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start">
                <Grid item marginBottom="20px" marginRight="20px">
                  <FormControl variant="standard" sx={{ marginTop: '10px', minWidth: 180 }}>
                    <InputLabel id="sort-by-label">Sort by</InputLabel>
                    <Select
                      labelId="sort-by-label"
                      id="sort-by"
                      value={sortSelection}
                      onChange={e => handleSortSelection(e.target.value)}
                      label=""
                      sx={{marginTop: '3px'}}
                    >
                      <MenuItem value='h-l'>
                        Price Low to High
                      </MenuItem>
                      <MenuItem value='l-h'>
                        Price High to Low
                      </MenuItem>
                      <MenuItem value='a-z'>
                        Name A-Z
                      </MenuItem>
                      <MenuItem value='z-a'>
                        Name Z-A
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container direction="column" paddingTop="40px">
                <Grid item>
                  <Typography align='left' variant='overline' sx={{color: "#e1e1e0"}}>
                    Filter
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Button onClick={filterOrders} variant='contained' size='small' sx={{height: '30px', marginTop: '24px', marginRight: '10px'}}>Apply Filter</Button>
                  {isFiltered && <Tooltip title="Clear Filters" placement="right">
                      <Button onClick={clearFilters} variant='contained' size='small' sx={{height: '30px', width: '30px', marginTop: '24px'}}><BackspaceRounded /></Button>
                    </Tooltip>}
                </Grid>
              </Grid>
              <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item 
              xs={12} sm={12} md={12} lg={12} xl={12}>
              {isFiltered && orders?.length === 0 && <Grid container direction="row" justifyContent="center" sx={{marginTop: '10vh'}}>
                <Grid item>
                  <Alert severity="info">Hmmm...we couldn't find anything that matches your filter selection. Clear your filter selections or try a different filter combination.</Alert>
                </Grid>
              </Grid>}
              <Grid container 
                spacing={{ xs: 2, sm: 2, md: 2, lg: 1, xl: 1 }} 
                direction="row" justifyContent="left" alignItems="stretch"
                sx={cardStyle}>
                {!isLoaded && skeletons?.map((skeleton, i) => (
                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3} key={i}>
                    <CardSkeleton />
                  </Grid>
                ))}
                {orders?.map((item, i) => (
                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3} key={i}>
                    <NftCard item={item} showCardInfo={showCardInfo} clearCardInfo={clearCardInfo} handleSuccessfulBuy={handleSuccessfulBuy} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ScrollToTopButton />
      <BuySuccess show={showSuccessfulBuy} onClose={handleSuccessfulBuyClose} />
    </Box>)
}
