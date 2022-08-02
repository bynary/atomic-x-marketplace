import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'

interface IRequireAuthProps{
  children: JSX.Element,
  role?: string
}

//export default function RequireAuth({children}: { children: JSX.Element})
export default function RequireAuth(props:IRequireAuthProps)
{
  let location = useLocation()
  const { children, role } = props

  //This appselector duplicates the 'selectIsAuthenticated' function the ProfileSlice because we can't import the profileSlice here without causing circular import issues
  const isAuthenticated = useAppSelector((state) => { return state?.profile?.user?.isAuthenticated || false })
  const userRoles = useAppSelector((state) => { return state?.profile?.user?.principal?.userRoles || [] })
  
  console.log('RequireAuth', { location, role, userRoles } )

  if(!isAuthenticated){
    return <Navigate to={'/login'} replace={true} state={{from:location.pathname}}/>
  }

  if(role && !userRoles.includes(role)){
    return <Navigate to={'/notauthorized'} replace={true} state={{ from:location.pathname, role }}/>
  }

  return children
}