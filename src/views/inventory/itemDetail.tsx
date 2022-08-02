import * as React from 'react'
import ImxClient from 'services/imxClient'
import { ImxService } from 'types'
import assetApi from 'api/asset'
import Asset from 'types/asset.class'

// MUI imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Card, CardMedia, Grid,IconButton,Paper, Stack, TextField, Typography } from '@mui/material'
//import { HeartSwitch } from '@anatoliygatt/heart-switch';
import { styled } from '@mui/material/styles'
import { Close, Send } from '@mui/icons-material'
import { ERC721TokenType } from '@imtbl/imx-sdk';

// Leaflet imports
// import map from 'assets/images/nua_birdseye_map.png'
// import leafletLogo from 'assets/images/react-leaflet-logo.svg'
// import { CRS } from 'leaflet'
// import { GeoJSON, MapContainer, ImageOverlay, ZoomControl } from 'react-leaflet'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export interface ItemDetailProps{
  id: string,
  item: any|null|undefined,
  show: boolean,
  onClose?: () => void
}

export default function ScrollDialog(props:ItemDetailProps) {
  const [open, setOpen] = React.useState(false);
  const [imx, setImxClient] = React.useState<ImxService|null>(null)
  //const [checked, setChecked] = React.useState(false);
  const [metadata, setMetadata] = React.useState<any|null>(null)
  const [transferToAddress, setTransferToAddress] = React.useState('')
  const [showTransferBox, setShowTransferBox] = React.useState(false)

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

  // Check the wallet address to make sure it's valid
  const isEthAddress = (walletAddress: string) => {
    let ethWalletRegex: RegExp = /^0x[a-fA-F0-9]{40}$/

    return ethWalletRegex.test(walletAddress)
  }

  const onTransfer = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (imx && isEthAddress(transferToAddress)){
      await imx.link.transfer([
        {
          tokenId: props.item.token_id,
          type: ERC721TokenType.ERC721,
          tokenAddress: props.item.token_address,
          toAddress: transferToAddress,
        }
      ]);
    } 
    else {
      console.log("This is not a valid wallet address: ", transferToAddress)
    }
  }

  const onSell = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (imx) {
      imx.link.sell({
        tokenId: props.item.token_id,
        tokenAddress: props.item.token_address,
      })
    }
  }

  const onShowTransferBox = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowTransferBox(true)
  }

  const handleRecipientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransferToAddress(event.target.value);
  };

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
    const getAssetMetadata = () => {    
      const asset = new Asset(props.item.token_id, props.item.collection.name)
      
      assetApi.getAssetMetadata(asset).then(cards => {
        setMetadata(cards)
      })
    }

    setOpen(props.show)
    if (open) {
      getAssetMetadata()
    }    
  }, [props.show, open, props.item.token_id, props.item.collection.name])

  React.useEffect(() => {
    buildImx()
  },[props.item])

  const TransferBox = () => {
    return(
      <>
        {!showTransferBox && <Button 
          onClick={onShowTransferBox}
          variant="contained" 
          color="secondary">
          Transfer
        </Button>}
        {showTransferBox && <Button 
          onClick={onTransfer}>
            <Send />
        </Button>}
        {showTransferBox && <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="standard-required"
              label="Recipient Wallet"
              variant="standard"
              onChange={handleRecipientChange}
            />
          </Box>}
      </>
    );
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
            <Box flexGrow={1} sx={{ color: '#0f3457', fontWeight: 'bold', fontSize: '24px' }}>{ props.item.name }</Box>
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
                    elevation={0}
                    sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <CardMedia
                      component="img"
                      width="50%"
                      image={ props.item.image_url }
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
                      { props.item.token_id }
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
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onSell}
            variant="contained">
              List for Sale
          </Button>
          <TransferBox />
        </DialogActions>
      </Dialog>
    </div>
  );
}

