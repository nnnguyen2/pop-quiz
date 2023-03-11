import AppRouters from 'router'
import AppContext from 'context'

const { Provider } = AppContext

const App: React.FC = () => {
  return (
    <Provider value={{}}>
      <AppRouters />
    </Provider>
  )
}

export default App
