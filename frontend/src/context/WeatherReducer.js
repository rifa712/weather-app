const WeatherReducer = (state, action) => {
  switch (action.type) {
    case 'GET_WEATHER':
      return {
        ...state,
        weather: action.payload,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

export default WeatherReducer
