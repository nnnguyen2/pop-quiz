import { type ReactElement } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { clientRouters, publicRouters, type Route as RouteType } from './routes'

const renderRouters: (routes: RouteType[]) => ReactElement[] = (routes) =>
  routes.map((route) => <Route {...route} key={route.key} />)

const AppRouters: React.FC = () => (
  <>
    <Router>
      <Routes>
        {renderRouters(publicRouters)}
        {renderRouters(clientRouters)}
      </Routes>
    </Router>
  </>
)

export default AppRouters
