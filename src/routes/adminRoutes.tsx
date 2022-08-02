import * as React from 'react'
import { RouteObject } from 'react-router'
import Auth from './requireAuth'

// Views
import AdminLayout from 'views/admin/layout/main'
import AdminIndex from 'views/admin/index'
import OtherIndex from 'views/admin/other'

const routes : RouteObject[] = [
  {
    path: '/admin',
    element: <Auth role="sysadmin"><AdminLayout/></Auth>,
    children: [
      { index: true, element: <AdminIndex/>},
      { path: 'other', element: <OtherIndex/>}
    ]
  }
]

export default routes