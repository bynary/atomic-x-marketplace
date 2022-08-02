import { AppBar, Toolbar,Divider,Link } from '@mui/material'
import { Close } from '@mui/icons-material'
import WalletInfo from 'features/layout/walletInfo'

export default function MenuAppBar() {
  return (
    <AppBar position="static" sx={{bgcolor: '#000000', borderColor: 'rgba(255,255,255,0.2)', borderStyle: 'solid', borderWidth: '0px 0px 1px 0px'}}>
        <Toolbar>
            <Link href="/">
              {/* <img src={logo} alt="Logo" className="appbar-logo" style={{paddingTop:"3px", maxHeight:"70px", marginRight:"1em" }}/> */}
              <Close sx={{ fontSize: '64px', color: '#89FCE1' }} /> 
            </Link>

            <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }}/>

            <div>
                <WalletInfo/>
                {/* <LoginInfo/> */}
            </div>
        </Toolbar>
    </AppBar>
  )
}
