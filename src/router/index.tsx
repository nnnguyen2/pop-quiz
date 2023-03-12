import { type ReactElement } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {
  adminRouters,
  clientRouters,
  publicRouters,
  type Route as RouteType
} from './routes'

const renderRouters: (routes: RouteType[]) => ReactElement[] = (routes) =>
  routes.map((route) => <Route {...route} key={route.key} />)

const AppRouters: React.FC = () => (
  <>
    <Router>
      <Routes>
        {renderRouters(publicRouters)}
        {renderRouters(clientRouters)}
        {renderRouters(adminRouters)}
      </Routes>
    </Router>
  </>
)

export default AppRouters
