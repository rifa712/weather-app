import axios from 'axios'

const API_URL = '/api/weather/'
// const IconURI = `http://openweathermap.org/img/wn/${a}@2x.png`

// GET search users
export const getWeather = async (text) => {
  const res = await axios.get(API_URL + text)

  return res.data
}
