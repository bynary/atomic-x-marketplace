import * as React from 'react'
import Config from 'config'
import { Divider, IconButton, Link, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { AccountCircle, Login as LoginIcon, LogoutOutlined, AdminPanelSettings } from '@mui/icons-material'
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks'
import { selectIsAuthenticated, selectUser } from 'store/profile/profileSlice'

export default function WalletInfo(){
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const [anchorEl, setAnchorEl ] = React.useState<Element | null>(null);
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  
  React.useEffect(() => {
  })

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate('/admin')
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  let item = null

  if(!isAuthenticated){
    item =  <IconButton
                size="large"
                aria-label="login"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                title="login"
                onClick={handleLogin}
              >
                <LoginIcon />
              </IconButton>
  }
  else {
    item = <span>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={ handleMenu }
              >
              <AccountCircle />
              </IconButton>
              <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              >
              <MenuItem component={Link}>
                {user?.principal?.userDetails}
              </MenuItem>
              <Divider/>
              <MenuItem component={RouterLink} to="/profile">
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText>Network</ListItemText>
              </MenuItem>
              <MenuItem component={RouterLink} to="/admin">
                <ListItemIcon>
                  <AdminPanelSettings/>
                </ListItemIcon>
                <ListItemText>Admin</ListItemText>
              </MenuItem>
              <MenuItem component={Link} href={Config.logoutPath}>
                <ListItemIcon>
                  <LogoutOutlined fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
              </Menu>
            </span>
  }
  return (
    item
  )
}