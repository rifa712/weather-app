import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
// context
import { getWeather } from '../context/WeatherAction'
import WeatherContext from '../context/WeatherContext'
// assets
import { FaSearch } from 'react-icons/fa'

const MainDisplay = () => {
  const [text, setText] = useState()

  // For The clock
  const [date, setDate] = useState(new Date())
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000)

    return () => clearInterval(timer)
  }, [])

  //   WEATHER
  useEffect(() => {
    const getWeatherData = async () => {
      dispatch({ type: 'SET_LOADING' })
      const weatherData = await getWeather('Bandung')
      dispatch({ type: 'GET_WEATHER', payload: weatherData })
    }

    getWeatherData()
    // eslint-disable-next-line
  }, [])

  const { dispatch, weather, loading } = useContext(WeatherContext)

  //    On Search
  const handleChange = (e) => {
    setText(e.target.value)
  }

  const onSearchSubmitHandler = async (e) => {
    e.preventDefault()
    dispatch({ type: 'SET_LOADING' })
    const weatherData = await getWeather(text)
    dispatch({ type: 'GET_WEATHER', payload: weatherData })
    setText('')
  }

  return (
    <section className='container w-12/12 mx-auto min-h-screen p-4 flex-col justify-center items-center'>
      {/* Logo */}
      <div className='w-full flex justify-between'>
        <a
          href='https://openweathermap.org/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src='https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png'
            alt='weather api'
            className='h-12'
          />
        </a>

        <div className='flex flex-col text-primary items-end font-bold'>
          <p className='text-sm leading-snug text-right md:text-left'>
            {date.toLocaleDateString('en-US', options)}
          </p>
          <h2 className='text-sm leading-snug text-right md:text-left'>
            {date.toLocaleTimeString()}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className='mt-8 mb-4'>
        <form
          onSubmit={onSearchSubmitHandler}
          className='flex justify-center items-center'
        >
          <div className='container flex justify-center items-center mx-auto bg-black bg-opacity-50 outline-none py-2 px-4 placeholder-white rounded-full text-white'>
            <input
              type='text'
              placeholder='Search any city ...'
              className='w-full bg-transparent outline-none'
              value={text || ''}
              onChange={handleChange}
            />
            <button className='bg-transparent text-white'>
              <FaSearch />
            </button>
          </div>
        </form>
      </div>

      {/* Display */}
      <div className='w-full min-h-[60vh] flex flex-col justify-center items-center  text-primary'>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1 className='text-5xl font-bold leading-snug text-center md:text-left'>
              {weather.name}, {weather.sys.country}
            </h1>

            <div className='flex justify-center items-center'>
              <h1 className='text-5xl text-white leading-snug text-center md:text-left'>
                {Math.round(weather.main.temp)}&deg;C
              </h1>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=''
                className='w-24'
              />
            </div>
            <p className='font-bold'>{weather.weather[0].description}</p>
            {/* Additional */}
            <div className='relative w-full mt-8'>
              <div className='absolute w-full h-full top-0 left-0 bg-white opacity-30 rounded-xl'></div>
              <div className='w-12/12 relative p-4 flex flex-wrap justify-center items-center gap-4 md:gap-8 font-bold'>
                <div className='w-24 h-24 bg-black rounded-full text-secondary flex flex-col justify-center items-center'>
                  <h1 className='text-primary'>Cloudiness</h1>
                  <p className='text-secondary'>{weather.clouds.all}%</p>
                </div>

                <div className='w-24 h-24 bg-black rounded-full text-secondary flex flex-col justify-center items-center'>
                  <h1 className='text-primary'>Humidity</h1>
                  <p className='text-secondary'>{weather.main.humidity}%</p>
                </div>

                <div className='w-24 h-24 bg-black rounded-full text-secondary flex flex-col justify-center items-center'>
                  <h1 className='text-primary'>Pressure</h1>
                  <p className='text-secondary'>{weather.main.pressure} hPa</p>
                </div>

                <div className='w-24 h-24 bg-black rounded-full text-secondary flex flex-col justify-center items-center'>
                  <h1 className='text-primary'>Wind</h1>
                  <p className='text-secondary'>{weather.wind.speed} m/s</p>
                </div>

                <div className='w-24 h-24 bg-black rounded-full text-secondary flex flex-col justify-center items-center'>
                  <h1 className='text-primary'>Gust</h1>
                  <p className='text-secondary'>{weather.wind.gust} m/s</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default MainDisplay
