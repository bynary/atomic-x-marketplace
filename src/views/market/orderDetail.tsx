import * as React from 'react';
import { BigNumber, ethers } from 'ethers'
import ImxClient from 'services/imxClient'
import { ImxService } from 'types'
import assetApi from 'api/asset'
import Asset from 'types/asset.class'
import { selectImxBalance } from 'store/profile/profileSlice'
import { useAppSelector } from 'store/hooks'

// MUI imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Card, CardMedia, Grid,IconButton,Paper, Stack, Typography } from '@mui/material'
//import { HeartSwitch } from '@anatoliygatt/heart-switch';
import { styled } from '@mui/material/styles';
import { Close } from '@mui/icons-material';
import eth_icon from 'assets/images/ethereum_icon_white.png'

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
  onClose?: () => void
}

export default function ScrollDialog(props:OrderDetailProps) {
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState<any|null>(null)
  const [imx, setImxClient] = React.useState<ImxService|null>(null)
  //const [checked, setChecked] = React.useState(false);
  const [metadata, setMetadata] = React.useState<any|null>(null)
  const [sufficientFunds, setSufficientFunds] = React.useState(true)

  const imxBalance = useAppSelector(selectImxBalance)

  async function buildImx(){
    const c = await ImxClient()
    setImxClient(c)
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
          })
        }
      }
    }
    catch(e){
      console.log('buy exception', e)
    }
  }

  const fundsMessage = () => {
    if (!sufficientFunds) {
      return "Insufficient funds. Please deposit additional funds to purchase this token."
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

    setOpen(props.show)
    getAssetMetadata()
  }, [props.show, props.order?.sell.data.token_id, props.order?.sell.data.properties.collection.name])

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
                <Box flexGrow={1}>{ order?.sell.data.properties.name }</Box>
                <Box>
                    <IconButton onClick={handleClose}>
                          <Close color="warning" />
                    </IconButton>
                </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Item>
                  <Card 
                    elevation={ 4 }
                    sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <CardMedia
                      component="img"
                      width="50%"
                      image={ order?.sell.data.properties.image_url }
                    >
                    </CardMedia>
                  </Card>
                </Item>
              </Grid>
              <Grid item xs={8}>
                <Stack spacing={2}>
                  <Item>
                  <Typography variant="subtitle2" color="primary" align="left">
                      ID: 
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="left">
                      <br/>
                      { order?.sell.data.token_id }
                    </Typography>
                  </Item>
                  {metadata?.rarity && <Item>
                    <Typography variant="subtitle2" color="primary" align="left">
                      Rarity: 
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="left">
                      <br/>
                      { metadata?.rarity }
                    </Typography>
                  </Item>}
                  <Item>
                    <Typography variant="subtitle2" color="primary" align="left">
                      Description: 
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="left">
                      <br/>
                      { metadata?.description }
                    </Typography>
                  </Item>
                  {!sufficientFunds && <Item>
                    <Typography variant="body2" color="error" align="right">
                      { fundsMessage() }
                    </Typography>
                  </Item>}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box sx={{ flexGrow: 1, mr: 3 }}>
            <Typography variant="body2" color="text.secondary" fontSize={16} align="right">
              <label>List Price: </label>{ price() } <img src= { eth_icon } height="16px" alt="Ethereum Cryptocurrency Icon" />
            </Typography>
          </Box>
          <Button 
            onClick={onBuyNow}
            variant="contained" 
            color="warning">
            Buy Now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

