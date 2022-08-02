import * as React from 'react'
import { ethers, BigNumber } from 'ethers'
import ImxClient from 'services/imxClient'
// import Network from 'features/settings/networkSwitcher'
import Founder from 'features/status/founder'
import { ImmutableAssetStatus } from '@imtbl/imx-sdk'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { selectNetwork } from 'store/network/networkSlice'
import { selectUser, disconnectWallet, selectImxBalance } from 'store/profile/profileSlice'
import { ETHTokenType } from '@imtbl/imx-sdk'
import { FormControl, Link, Button, Grid, Typography, Divider, TextField, Alert, Box } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { AccountBalanceWallet, Apps, Launch } from '@mui/icons-material';
import eth_icon from 'assets/images/ethereum_icon_gray.png'
import moonpay_logo from 'assets/images/moonpay_logo.svg'
// import ItemCard from 'views/inventory/itemCard'

export default function ProfileIndex(){
  const dispatch = useAppDispatch()
  const selectedNetwork = useAppSelector(selectNetwork)
  const user = useAppSelector (selectUser)
  const imxBalance = useAppSelector(selectImxBalance)
  //const [assets, setAssets] = React.useState<any[]|null>(null)
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false)

  const [ depositAmount, setDepositAmount ] = React.useState<string>('')
  const [ balance, setBalance ] = React.useState<string>('0')

  React.useEffect(() => {
    function formatBalance(){
      if(imxBalance){
        setBalance(ethers.utils.formatEther(imxBalance as BigNumber))
      }
    }

    formatBalance()

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
  
      //setAssets(results)
    }

    async function load(){
      if(!isLoaded){
        if(user?.isConnected){
          await loadAssets()
        }
        setIsLoaded(true)
      }
    }

    load()
  }, [user,imxBalance,isLoaded,selectedNetwork?.equipmentContractAddress])

  const onDisconnect = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(disconnectWallet())
    //setAssets(null)
    localStorage.setItem('USER', '')
  }

  const onDeposit = async (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try{
      
      const client = await ImxClient()
      await client.link.deposit(
      {
        amount: depositAmount, 
        type: ETHTokenType.ETH
      })
    }
    catch(e:any){
      if(e.message !== "Link Window Closed"){
        console.log('transfer eth error', e)
      }
    }
  }

  const MoonpayTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
    },
  }));
  

  const handleDepositChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDepositAmount(event.target.value as string)
  }

  const handleMoonPay = async (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try{
      
      const client = await ImxClient()
      await client.link.fiatToCrypto({})
    }
    catch(e:any){
      if(e.message !== "Link Window Closed"){
        console.log('transfer eth error', e)
      }
    }
  }

  const connectWalletMessage = () => {
    if (!user?.isConnected) {
      return <Grid container 
        direction="column"
        justifyContent="center"
        alignItems="center">
        <Grid item>
          <Alert severity="info" sx={{marginTop: '20px'}}>Connect your wallet to interact with IMX.</Alert>
        </Grid>
      </Grid>
      
    }
  }

  return(
    <div> 
      {connectWalletMessage()}
      <Founder />
      {user?.isConnected && <Grid container spacing={1} marginBottom="20px">
        <Grid item xs={12}>
          <Typography variant="h4" color="#0f3457" align="left">
            <AccountBalanceWallet /> Wallet {user?.isConnected && <Tooltip title="Disconnect Wallet" placement="top-start">
              <Button onClick={onDisconnect} aria-label="disconnect wallet" color="error">Disconnect</Button>
            </Tooltip>}
          </Typography>
        </Grid>
        {connectWalletMessage}
        <Grid item xs={12}>
          <Typography variant="subtitle2" fontSize="16px" color="#0f3457" align="left">
            Public Address: {user?.walletAddress}
           </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" fontSize="16px" color="#0f3457" align="left">
            Balance: { balance } <img src={eth_icon} height="16px" alt="Ethereum Cryptocurrency Icon" /> &nbsp; 
            <Tooltip title="View wallet balance on ImmutableX" placement="right-start">
              <Link href={`${selectedNetwork?.marketplaceUrl}/inventory`} 
                target="_blank" 
                rel="noopener"
                underline="hover"
                fontSize='12px'>
                 View balance on ImmutableX <Launch fontSize='inherit' />
              </Link>
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item xs={12}>         
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                borderRadius: 1,
                bgcolor: 'transparent',
              }}
            >
              <FormControl sx={{m:1, minWidth:200}}>
                <TextField label='ETH Amount' size='small' type='number' onChange={handleDepositChange} InputProps={{ inputProps: { min: 0 } }} />
              </FormControl>
              <Tooltip title="Transfer Ethereum from Metamask to your IMX Wallet">
                <Button onClick={onDeposit} aria-label="deposit eth" color="success" variant='contained' sx={{marginRight: '20px'}}>
                  Deposit ETH
                </Button>
              </Tooltip>
              <Divider orientation="vertical" variant='middle' flexItem />
              <MoonpayTooltip title={
                  <React.Fragment>Powered by <Link href="https://www.moonpay.com/"><img src={moonpay_logo} height="12rem" style={{paddingLeft: "4px"}} alt="Moonpay Logo"></img></Link></React.Fragment>
                }>
                <Button onClick={handleMoonPay} aria-label="deposit eth" color="success" variant='contained' sx={{marginLeft: '20px'}}>
                  Buy Crypto
                </Button>
              </MoonpayTooltip>
            </Box>
        </Grid>
      </Grid>}     
      {user?.isConnected && <Divider />}
      {user?.isConnected && <Grid container spacing={1} marginTop="10px">
        <Grid item xs={12}>
          <Typography variant="h4" color="#0f3457" align="left">
            <Apps /> Inventory 
          </Typography>
          Coming soon! In the meantime, you can view your NFT inventory on the <Link href="https://market.immutable.com/inventory">Immutable X marketplace</Link>.
        </Grid>
        {/* {user?.isConnected && <Grid item xs={12}>
          <Grid container spacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }} columns={{ xs: 4, sm: 4, md: 6, lg: 6, xl: 12 }} direction="row" justifyContent="left" alignItems="stretch">
            {assets?.map((item, i) => (
              <Grid item xs={2} sm={3} md={2} lg={2} xl={2} key={i}>
                <ItemCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Grid>} */}
      </Grid>}
      {/* <h2>Network/Environment</h2>
      <ul className="list">
        <li><Network/></li>
        <li>IMX Link Address: {selectedNetwork?.linkAddress}</li>
        <li>IMX API Address: {selectedNetwork?.apiAddress}</li>
      </ul> */}
    </div>
  )
}