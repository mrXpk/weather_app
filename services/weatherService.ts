import axios from 'axios';
import { ApiForecastResponse, ApiWeatherResponse, ForecastDay, WeatherData } from '../types/weather';

const API_KEY = '56ddde9910ab2bfa5ff00ff8dcc1b4f4'; // You'll need to replace this with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  private apiKey: string;

  constructor(apiKey: string = API_KEY) {
    this.apiKey = apiKey;
  }

  // Get current weather by coordinates
  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    try {
      console.log('Fetching weather for coordinates:', lat, lon);
      console.log('Using API key:', this.apiKey.substring(0, 8) + '...');
      
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get<ApiWeatherResponse>(`${BASE_URL}/weather`, {
          params: {
            lat,
            lon,
            appid: this.apiKey,
            units: 'metric'
          }
        }),
        axios.get<ApiForecastResponse>(`${BASE_URL}/forecast`, {
          params: {
            lat,
            lon,
            appid: this.apiKey,
            units: 'metric'
          }
        })
      ]);

      console.log('Weather API response received successfully');
      return this.transformApiResponse(weatherResponse.data, forecastResponse.data);
    } catch (error: any) {
      console.error('Error fetching weather by coordinates:', error);
      
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        console.error('Status:', error.response.status);
        
        if (error.response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        } else if (error.response.status === 404) {
          throw new Error('Location not found. Please try a different location.');
        } else {
          throw new Error(`API Error: ${error.response.data.message || 'Unknown error'}`);
        }
      } else if (error.request) {
        console.error('Network Error:', error.request);
        throw new Error('Network error. Please check your internet connection.');
      } else {
        console.error('Error:', error.message);
        throw new Error('Failed to fetch weather data');
      }
    }
  }

  // Get current weather by city name
  async getCurrentWeatherByCity(city: string): Promise<WeatherData> {
    try {
      console.log('Fetching weather for city:', city);
      
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get<ApiWeatherResponse>(`${BASE_URL}/weather`, {
          params: {
            q: city,
            appid: this.apiKey,
            units: 'metric'
          }
        }),
        axios.get<ApiForecastResponse>(`${BASE_URL}/forecast`, {
          params: {
            q: city,
            appid: this.apiKey,
            units: 'metric'
          }
        })
      ]);

      console.log('Weather API response received successfully for city:', city);
      return this.transformApiResponse(weatherResponse.data, forecastResponse.data);
    } catch (error: any) {
      console.error('Error fetching weather by city:', error);
      
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        console.error('Status:', error.response.status);
        
        if (error.response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        } else if (error.response.status === 404) {
          throw new Error(`City "${city}" not found. Please try a different city name.`);
        } else {
          throw new Error(`API Error: ${error.response.data.message || 'Unknown error'}`);
        }
      } else if (error.request) {
        console.error('Network Error:', error.request);
        throw new Error('Network error. Please check your internet connection.');
      } else {
        console.error('Error:', error.message);
        throw new Error('Failed to fetch weather data for the specified city');
      }
    }
  }

  // Search cities by name
  async searchCities(query: string): Promise<Array<{ name: string; country: string; lat: number; lon: number }>> {
    try {
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
        params: {
          q: query,
          limit: 5,
          appid: this.apiKey
        }
      });

      return response.data.map((item: any) => ({
        name: item.name,
        country: item.country,
        lat: item.lat,
        lon: item.lon
      }));
    } catch (error) {
      console.error('Error searching cities:', error);
      throw new Error('Failed to search cities');
    }
  }

  private transformApiResponse(weather: ApiWeatherResponse, forecast: ApiForecastResponse): WeatherData {
    // Transform forecast data - get one forecast per day at noon
    const dailyForecasts: ForecastDay[] = [];
    const processedDates = new Set<string>();

    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toISOString().split('T')[0];
      
      // Take the forecast closest to noon for each day
      if (!processedDates.has(dateString) && date.getHours() >= 12) {
        processedDates.add(dateString);
        dailyForecasts.push({
          date: dateString,
          temp: {
            max: item.main.temp_max,
            min: item.main.temp_min
          },
          weather: {
            main: item.weather[0].main,
            description: item.weather[0].description,
            icon: item.weather[0].icon
          },
          humidity: item.main.humidity,
          wind_speed: item.wind.speed
        });
      }
    });

    // Limit to 5 days
    const limitedForecasts = dailyForecasts.slice(0, 5);

    return {
      location: {
        name: weather.name,
        country: weather.sys.country,
        coord: {
          lat: weather.coord.lat,
          lon: weather.coord.lon
        }
      },
      current: {
        temp: Math.round(weather.main.temp),
        feels_like: Math.round(weather.main.feels_like),
        humidity: weather.main.humidity,
        pressure: weather.main.pressure,
        visibility: weather.visibility,
        wind_speed: weather.wind.speed,
        wind_deg: weather.wind.deg,
        weather: {
          main: weather.weather[0].main,
          description: weather.weather[0].description,
          icon: weather.weather[0].icon
        }
      },
      forecast: limitedForecasts
    };
  }

  // Get weather icon URL
  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}

export const weatherService = new WeatherService();
export default WeatherService;