import MainBg from './assets/main-bg.jpg'
import MainDisplay from './components/MainDisplay'
import { WeatherProvider } from './context/WeatherContext'

const App = () => {
  return (
    <WeatherProvider>
      <div
        className='app-main w-full w-12/12 min-h-screen flex flex-col md:flex-row'
        style={{ backgroundImage: `url(${MainBg})` }}
      >
        <MainDisplay />
      </div>
    </WeatherProvider>
  )
}

export default App
