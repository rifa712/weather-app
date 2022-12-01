import { createContext, useReducer } from 'react'
import WeatherReducer from './WeatherReducer'

const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
  const initialState = {
    weather: null,
    icon: null,
    loading: true,
  }

  //   reducers
  const [state, dispatch] = useReducer(WeatherReducer, initialState)

  return (
    <WeatherContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext
