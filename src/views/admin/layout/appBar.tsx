import { AppBar, Toolbar,Divider,Link } from '@mui/material'
import logo from 'assets/images/uft_logo.webp'
import WalletInfo from 'features/layout/walletInfo'
import LoginInfo from 'features/layout/loginInfo'

export default function MenuAppBar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, top: 0 }}>
        <Toolbar>
            <Link href="/">
              <img src={logo} alt="Logo" className="appbar-logo" style={{paddingTop:"3px", maxHeight:"70px", marginRight:"1em" }}/>
            </Link>
            <h2>Admin</h2>
          
            <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }}/>

            <div>
                <WalletInfo/>
                <LoginInfo/>
            </div>
        </Toolbar>
    </AppBar>
  )
}
