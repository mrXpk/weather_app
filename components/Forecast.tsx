import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { weatherService } from '../services/weatherService';
import { ForecastDay } from '../types/weather';

interface ForecastProps {
  data: ForecastDay[];
}

export function Forecast({ data }: ForecastProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5-Day Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.forecastContainer}>
          {data.map((day, index) => (
            <ForecastCard key={index} day={day} date={formatDate(day.date)} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

interface ForecastCardProps {
  day: ForecastDay;
  date: string;
}

function ForecastCard({ day, date }: ForecastCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{date}</Text>
      <Image
        source={{ uri: weatherService.getWeatherIconUrl(day.weather.icon) }}
        style={styles.icon}
      />
      <Text style={styles.condition}>{day.weather.main}</Text>
      <View style={styles.tempContainer}>
        <Text style={styles.maxTemp}>{Math.round(day.temp.max)}°</Text>
        <Text style={styles.minTemp}>{Math.round(day.temp.min)}°</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailText}>{day.humidity}% humidity</Text>
        <Text style={styles.detailText}>{day.wind_speed} m/s wind</Text>
      </View>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  forecastContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    width: 120,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  condition: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  tempContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  maxTemp: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  minTemp: {
    fontSize: 16,
    color: '#999',
  },
  details: {
    alignItems: 'center',
  },
  detailText: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
});