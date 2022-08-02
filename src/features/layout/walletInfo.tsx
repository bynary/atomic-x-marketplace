import * as React from 'react'
import { Button, Tooltip } from '@mui/material'
import { AccountBalanceWallet, AccountBalanceWalletTwoTone } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'store/hooks'
import { connectWallet, selectUser } from 'store/profile/profileSlice'

export default function WalletInfo(){
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  
  React.useEffect(() => {
    
  })

  const connect =  async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try{
      dispatch(connectWallet()).then(async function () {    
        // todo: recheck is founder here on wallet connect
        navigate('/landsale')
      })
    }
    catch(e){
      console.log("wallet connect error: ", e)
    }
  };

  let button = null

  if(user?.isConnected){
    button =  <Tooltip title="Wallet and NFT Inventory" placement="bottom"><Button component={RouterLink} to="/profile" color="success" sx={{color:'#fff'}} endIcon={<AccountBalanceWalletTwoTone />}>Connected</Button></Tooltip>
  }
  else {
    button = <Tooltip title="Connect your wallet to Immutable X" placement="bottom"><Button onClick={ connect } color="error">Connect Wallet</Button></Tooltip>
  }
  return (
     button
  )
}