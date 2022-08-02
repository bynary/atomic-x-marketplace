import { Link, Typography } from '@mui/material'
import Config from 'config'

export default function Copyright() {
    return (
      <Typography variant="body2" color="lightgray" align="center">
        Copyright {new Date().getFullYear()} &nbsp;
        <Link color="inherit" href={ Config.companyUrl }>
          { Config.company }
        </Link>{' '}
      </Typography>
    )
  }