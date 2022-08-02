import * as React from 'react'
import { Alert, Box, Collapse, Typography } from '@mui/material'

export default function AppMessage(){
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert icon={ false } variant="filled" severity="info" onClose={() => {setOpen(false)}} sx={{textAlign: 'center'}} className="app-message">
          <Typography align="center">
            Atomic-X Marketplace Beta
          </Typography>
        </Alert>
      </Collapse>
    </Box>
  )
}