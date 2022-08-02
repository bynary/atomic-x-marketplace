import { RouteObject } from 'react-router-dom'

//import Home from 'views/home'
import NotFound from 'views/404'
import MarketplaceLayout from 'features/layout/marketplaceLayout'
import Login from 'views/login'
import NotAuthorized from 'views/notauthorized'

// import Market from 'views/market'
import Profile from 'views/profile'
// import Inventory from 'views/inventory'

import adminRoutes from './adminRoutes'
import NftSale from 'views/nftSale'

const baseRoutes : RouteObject[] = [
    {
      path: '/',
      element: <MarketplaceLayout/>,
      children: [
        //{ index: true, element: <Home/>},
        // { path: '/marketplace', element: <Market/>},
        { index: true, element: <NftSale/>},
        { path: '/profile', element: <Profile/>},
        { path: '/nfts', element: <NftSale/>},
      ]
    },
    { path: '/login', element: <Login/>},
    { path: '/notauthorized', element: <NotAuthorized/> },
    { path: "*", element: <NotFound /> }
  ]

const routes = [...baseRoutes, ...adminRoutes] 

export default routes

// export default function AppRoutes(){
//   return (
//     <Routes>
//       <Route path="/" element={<Home/>}/>
//       <Route path="/marketplace" element={<Market/>}/>
//       <Route path="/profile" element={<Profile/>}/>
//       <Route path="/inventory" element={<Inventory/>}/>
//       <AdminRoutes/>
//       <Route path="/login" element={<Login/>}/>
//       <Route path="*" element={<NotFound/>}/>
//     </Routes>
//   )
// }