import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { weatherService } from '../services/weatherService';
import { WeatherData } from '../types/weather';

interface CurrentWeatherProps {
  data: WeatherData;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function CurrentWeather({ data, onRefresh, isLoading }: CurrentWeatherProps) {
  const { current, location } = data;

  return (
    <View style={styles.container}>
      {/* Header with location and refresh */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color="#666" />
          <Text style={styles.locationText}>
            {location.name}, {location.country}
          </Text>
        </View>
        <TouchableOpacity onPress={onRefresh} disabled={isLoading}>
          <Ionicons 
            name="refresh-outline" 
            size={24} 
            color={isLoading ? "#ccc" : "#666"} 
          />
        </TouchableOpacity>
      </View>

      {/* Main weather display */}
      <View style={styles.mainWeather}>
        <Image
          source={{ uri: weatherService.getWeatherIconUrl(current.weather.icon) }}
          style={styles.weatherIcon}
        />
        <Text style={styles.temperature}>{current.temp}°</Text>
        <Text style={styles.description}>{current.weather.description}</Text>
        <Text style={styles.feelsLike}>Feels like {current.feels_like}°</Text>
      </View>

      {/* Weather details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <WeatherDetail
            icon="water-outline"
            label="Humidity"
            value={`${current.humidity}%`}
          />
          <WeatherDetail
            icon="speedometer-outline"
            label="Pressure"
            value={`${current.pressure} hPa`}
          />
        </View>
        <View style={styles.detailRow}>
          <WeatherDetail
            icon="eye-outline"
            label="Visibility"
            value={`${(current.visibility / 1000).toFixed(1)} km`}
          />
          <WeatherDetail
            icon="flag-outline"
            label="Wind"
            value={`${current.wind_speed} m/s`}
          />
        </View>
      </View>
    </View>
  );
}

interface WeatherDetailProps {
  icon: any;
  label: string;
  value: string;
}

function WeatherDetail({ icon, label, value }: WeatherDetailProps) {
  return (
    <View style={styles.detail}>
      <Ionicons name={icon} size={20} color="#666" />
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  mainWeather: {
    alignItems: 'center',
    marginBottom: 30,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '300',
    color: '#333',
    marginTop: -10,
  },
  description: {
    fontSize: 18,
    color: '#666',
    textTransform: 'capitalize',
    marginTop: -5,
  },
  feelsLike: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});