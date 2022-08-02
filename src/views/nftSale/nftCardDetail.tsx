import * as React from 'react';
import { BigNumber, ethers } from 'ethers'
import ImxClient from 'services/imxClient'
import { ImxService } from 'types'
import assetApi from 'api/asset'
import Asset from 'types/asset.class'
import { selectImxBalance, selectUser, connectWallet } from 'store/profile/profileSlice'
import { useAppSelector, useAppDispatch } from 'store/hooks'

// MUI imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Box, Card, CardMedia, Divider, Grid, IconButton, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { Close } from '@mui/icons-material';
import eth_icon from 'assets/images/ethereum_icon_gray.png'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export interface OrderDetailProps{
  id: string,
  order: any|null|undefined,
  show: boolean,
  handleSuccessfulBuy: (id: any) => void,
  onClose?: () => void
}

export default function ScrollDialog(props:OrderDetailProps) {
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState<any|null>(null)
  const [imx, setImxClient] = React.useState<ImxService|null>(null)
  //const [checked, setChecked] = React.useState(false);
  const [metadata, setMetadata] = React.useState<any|null>(null)
  const [sufficientFunds, setSufficientFunds] = React.useState(true)
  const [successfulBuy, setSuccessfulBuy] = React.useState(true)
  const [mapX, setMapX] = React.useState<number|null>(null)
  const [mapY, setMapY] = React.useState<number|null>(null)

  const imxBalance = useAppSelector(selectImxBalance)
  const user = useAppSelector(selectUser)

  async function buildImx(){
    const c = await ImxClient()
    setImxClient(c)
  }

  const dispatch = useAppDispatch()
  
  const connect = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try{
      dispatch(connectWallet()).then(async function () {    
        // todo: recheck is founder here on wallet connect
      })
    }
    catch(e){

    }
  }

  // Dialog functions
  const handleClose = () => {
    if(props.onClose){
      props.onClose()
    }
    else{
      setOpen(false);
    }
  };  

  const onBuyNow = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    //handleClose()
    //props.handleSuccessfulBuy(order?.sell.data.token_id)
    if (user?.isConnected) {
      try{
      
        // Make sure the connected wallet has sufficient funds to cover the transaction
        // before submitting the IMX buy request
        const balanceInEth = parseFloat(ethers.utils.formatEther(imxBalance as BigNumber))
  
        const priceInEth = price()
        let assetPrice = 0
        if (priceInEth) {
          assetPrice = parseFloat(priceInEth)
        }
  
        if (balanceInEth < assetPrice) {
          setSufficientFunds(false)
        }
        else {
          if(imx){
            const request = {orderIds: [order.order_id]}
          
            console.log('buy request', {request, order})
            await imx.link.buy(request).then(() => {
              // TODO: show success message including link to inventory
              handleClose()
              props.handleSuccessfulBuy(order?.sell.data.token_id)
            }).catch(() => {
              setSuccessfulBuy(false)
            })
          }
        }
      }
      catch(e){
        console.log('buy exception', e)
      }
    } else {

    }
  }

  const fundsMessage = () => {
    if (!sufficientFunds) {
      return (<Typography variant="body2" color="error" align="right">
                Insufficient funds. Please deposit additional ETH to purchase this NFT.
                <br />
                You can deposit ETH on the Profile page. Just click on Connected above!
              </Typography>)
    }
  }

  const purchaseMessage = () => {
    if (!successfulBuy) {
      return (<Typography variant="body2" color="error" align="right">
                Oh no! Your NFT purchase didn't go through.
              </Typography>)
    }
  }

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  React.useEffect(() => {

    async function getAssetMetadata(){    
      const asset = new Asset(props.order?.sell.data.token_id, props.order?.sell.data.properties.collection.name)
      assetApi.getAssetMetadata(asset).then((response) => {
        setMetadata(response)
      })
    }

    const calculateCoordinates = () => {
      let coordinates = metadata?.coordinates
      if (coordinates) {
        let split: string[] = coordinates.split('x')
        let metadataX: number = parseFloat(split[0])
        let metadataY: number = parseFloat(split[1])
        let mapX = (metadataX * 0.0005)
        console.log(mapX)
        let mapY = (metadataY * 0.0005) * (-1) + 13
        console.log(mapY)
        setMapX(Math.trunc(mapX))
        setMapY(Math.trunc(mapY))
      }
    }

    setOpen(props.show)
    getAssetMetadata()
    if (open) {
      calculateCoordinates()
    }     
  }, [props.show, props.order?.sell.data.token_id, props.order?.sell.data.properties.collection.name, metadata?.coordinates, open])

  React.useEffect(() => {
    setOrder(props.order)
    buildImx()
  },[props.order])

  const price = () => {
    if(order && order.buy){
      return ethers.utils.formatUnits(order.buy.data.quantity, order.buy.data.decimals)
    } 
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="scroll-dialog-title">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} sx={{ color: '#0f3457', fontWeight: 'bold', fontSize: '24px' }}>{ order?.sell.data.properties.name }</Box>
            <Box>
                <IconButton onClick={handleClose}>
                  <Close color="info" />
                </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        {/* '"button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "overline" | "subtitle1" | "subtitle2" | "body1" | "body2" | undefined' */}
        <DialogContent sx={{ backgroundColor: '#fff' }}>
          <Box sx={{ flexGrow: 1, paddingTop: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card 
                  elevation={ 0 }
                  sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardMedia
                    component="img"
                    width="50%"
                    image={ order?.sell.data.properties.image_url }
                  >
                  </CardMedia>
                </Card>
              </Grid>
              <Divider />
              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" fontSize="20px" color="#0f3457" align="left">
                      Plot Type: <span style={{ color: '#494947', fontWeight: '400' }}>{ metadata?.plot_type }</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" fontSize="20px" color="#0f3457" align="left">
                      Resource: <span style={{ color: '#494947', fontWeight: '400' }}>{ metadata?.plot_sub_type }</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" fontSize="20px" color="#0f3457" align="left">
                      Coordinates: <span style={{ color: '#494947', fontWeight: '400' }}>{ mapX },{ mapY }</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{marginTop: '10px'}}>
                    <Typography variant="subtitle2" fontSize="20px" color="#0f3457" align="left">
                      Description: 
                    </Typography>
                    <Typography variant="subtitle1" fontSize="18px" color="text.secondary" align="left" minHeight="100px" height="305px" overflow="scroll">
                      { metadata?.description }
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-end">
                  <Grid item xs={2}>
                      <Typography variant="subtitle2" fontSize="20px" color="#0f3457" align="left">
                      ID: <span style={{ color: '#494947', fontWeight: '400' }}>{ order?.sell.data.token_id }</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="subtitle2" fontSize="20px" color="#0f3457" align="left">
                      Island: <span style={{ color: '#494947', fontWeight: '400' }}>{ metadata?.island }</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="subtitle2" fontSize="20px" color="#0f3457" align="left">
                      Faction: <span style={{ color: '#494947', fontWeight: '400' }}>{ metadata?.faction }</span>
                    </Typography>
                  </Grid>
                </Grid>
                {!sufficientFunds && <Item>
                    { fundsMessage() }
                    { purchaseMessage() }
                </Item>}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          {!user?.isConnected && <Alert severity="warning">
              Please connect your wallet to purchase land. <Button onClick={connect}>Connect Wallet</Button>
            </Alert>}
          <Box sx={{ flexGrow: 1, mr: 3 }}>
            <Typography color="text.primary" fontSize={16} align="right" fontWeight="bold">
              { price() } <img src= { eth_icon } height="14px" alt="Ethereum Cryptocurrency Icon" />
            </Typography>
          </Box>
          <Button 
            onClick={onBuyNow}
            variant="contained"
            color="info">
            Purchase
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

