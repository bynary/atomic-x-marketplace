import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material'
import NewReleasesIcon from '@mui/icons-material/NewReleases';

interface AppBarNavLinkProps{
  to: string
  label: string
  exact?: boolean
  activeClassName?: string,
  featured?: boolean
}

export default function AppBarNavLink(props: AppBarNavLinkProps){
  if (props.featured) {
    return (
      <Link
        component={RouterLink}
        activeClassName="navlink-active"
        variant="h6"
        underline="none" 
        color="whitesmoke"
        sx={{ paddingRight: "1em"}}
        {...props}
      >
        <NewReleasesIcon sx={{ color: '#FDD835' }} /> 
        { props.label}
      </Link>
    )
  }

  return (
    <Link
      component={RouterLink}
      activeClassName="navlink-active"
      variant="h6"
      underline="none" 
      color="whitesmoke"
      sx={{ paddingRight: "1em"}}
      {...props}
    >
      { props.label}
    </Link>
  )
}