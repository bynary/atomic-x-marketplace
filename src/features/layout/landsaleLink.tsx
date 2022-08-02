import AppBarNavLink from 'features/layout/appBarNavLink'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'store/profile/profileSlice'

export default function LandSaleLink(){
  const user = useAppSelector (selectUser)

    let link = <AppBarNavLink label="Founder Land Sale" to="/becomeafounder" featured={ true }/>

    if (user?.isConnected) { //&& user?.isFounder) {
      link = <AppBarNavLink label="Founder Land Sale" to="/landsale" featured={ true }/>
    }
  
    return (
      link
    )
  }