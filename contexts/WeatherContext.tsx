import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { locationService } from '../services/locationService';
import { weatherService } from '../services/weatherService';
import { LocationData, WeatherData } from '../types/weather';

interface WeatherState {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  currentLocation: LocationData | null;
  favorites: string[];
  unit: 'metric' | 'imperial';
}

type WeatherAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_WEATHER_DATA'; payload: WeatherData }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOCATION'; payload: LocationData }
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'SET_FAVORITES'; payload: string[] }
  | { type: 'SET_UNIT'; payload: 'metric' | 'imperial' };

const initialState: WeatherState = {
  weatherData: null,
  isLoading: false,
  error: null,
  currentLocation: null,
  favorites: [],
  unit: 'metric',
};

function weatherReducer(state: WeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_WEATHER_DATA':
      return { ...state, weatherData: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'ADD_FAVORITE':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      return { ...state, favorites: state.favorites.filter(city => city !== action.payload) };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'SET_UNIT':
      return { ...state, unit: action.payload };
    default:
      return state;
  }
}

interface WeatherContextType extends WeatherState {
  fetchWeatherByLocation: () => Promise<void>;
  fetchWeatherByCity: (city: string) => Promise<void>;
  addToFavorites: (city: string) => Promise<void>;
  removeFromFavorites: (city: string) => Promise<void>;
  toggleUnit: () => Promise<void>;
  searchCities: (query: string) => Promise<Array<{ name: string; country: string; lat: number; lon: number }>>;
  refreshWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  // Load saved data on app start
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const [savedFavorites, savedUnit] = await Promise.all([
        AsyncStorage.getItem('favorites'),
        AsyncStorage.getItem('unit'),
      ]);

      if (savedFavorites) {
        dispatch({ type: 'SET_FAVORITES', payload: JSON.parse(savedFavorites) });
      }

      if (savedUnit) {
        dispatch({ type: 'SET_UNIT', payload: savedUnit as 'metric' | 'imperial' });
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const fetchWeatherByLocation = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const location = await locationService.getLocationWithDetails();
      
      if (!location || !location.latitude || !location.longitude) {
        // If location fails, try to get weather for a default city
        console.log('Location unavailable, fetching weather for default city (London)');
        const weatherData = await weatherService.getCurrentWeatherByCity('London');
        dispatch({ type: 'SET_WEATHER_DATA', payload: weatherData });
        dispatch({ type: 'SET_ERROR', payload: 'Unable to get your location. Showing weather for London. You can search for your city using the search bar.' });
        return;
      }

      console.log('Got location:', location.latitude, location.longitude);
      dispatch({ type: 'SET_LOCATION', payload: location });
      
      const weatherData = await weatherService.getCurrentWeatherByCoords(
        location.latitude,
        location.longitude
      );

      dispatch({ type: 'SET_WEATHER_DATA', payload: weatherData });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
      console.error('Weather fetch error:', errorMessage);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const weatherData = await weatherService.getCurrentWeatherByCity(city);
      dispatch({ type: 'SET_WEATHER_DATA', payload: weatherData });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToFavorites = async (city: string) => {
    try {
      const newFavorites = [...state.favorites, city];
      dispatch({ type: 'ADD_FAVORITE', payload: city });
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (city: string) => {
    try {
      const newFavorites = state.favorites.filter(fav => fav !== city);
      dispatch({ type: 'REMOVE_FAVORITE', payload: city });
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const toggleUnit = async () => {
    try {
      const newUnit = state.unit === 'metric' ? 'imperial' : 'metric';
      dispatch({ type: 'SET_UNIT', payload: newUnit });
      await AsyncStorage.setItem('unit', newUnit);
      
      // Refresh weather data with new unit
      if (state.weatherData) {
        await refreshWeather();
      }
    } catch (error) {
      console.error('Error toggling unit:', error);
    }
  };

  const searchCities = async (query: string) => {
    return await weatherService.searchCities(query);
  };

  const refreshWeather = async () => {
    if (state.currentLocation) {
      await fetchWeatherByLocation();
    } else if (state.weatherData) {
      await fetchWeatherByCity(state.weatherData.location.name);
    }
  };

  const contextValue: WeatherContextType = {
    ...state,
    fetchWeatherByLocation,
    fetchWeatherByCity,
    addToFavorites,
    removeFromFavorites,
    toggleUnit,
    searchCities,
    refreshWeather,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}