
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { useRoutes } from 'react-router';
import Routes from 'routes'
import Config from 'config'
import { init, selectStatus } from 'store/profile/profileSlice'
import { setNetwork, networkLocalStorageKey } from 'store/network/networkSlice'
import { Status } from 'types'
import Loading from 'views/loading'

export default function App() {
  const dispatch = useAppDispatch()
  const profileStatus = useAppSelector(selectStatus)
  const appRoutes = useRoutes(Routes)

  useEffect(() => {
    if (profileStatus === 'idle') {
      dispatch(init())
      const network = localStorage.getItem(networkLocalStorageKey)
      dispatch(setNetwork(network))
    }
    document.title = Config.title;
  }, [profileStatus, dispatch])

  let el = <Loading/>

  if(profileStatus === Status.succeeded){
    el = <> { appRoutes } </>
  }
    
  return (
    el
  )
}