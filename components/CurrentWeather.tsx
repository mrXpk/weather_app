import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WeatherData } from '../types/weather';
import { weatherService } from '../services/weatherService';
import { GlassCard } from './GlassCard';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

interface CurrentWeatherProps {
  data: WeatherData;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function CurrentWeather({ data, onRefresh, isLoading }: CurrentWeatherProps) {
  const { current, location } = data;

  return (
    <View style={styles.container}>
      {/* Main Weather Card */}
      <GlassCard style={styles.mainCard}>
        {/* Location Header */}
        <View style={styles.locationHeader}>
          <Text style={styles.locationText}>
            {location.name}, {location.country}
          </Text>
          <TouchableOpacity onPress={onRefresh} disabled={isLoading} style={styles.refreshButton}>
            <Ionicons 
              name="refresh-outline" 
              size={24} 
              color={isLoading ? Colors.text.tertiary : Colors.text.primary} 
            />
          </TouchableOpacity>
        </View>

        {/* Main Temperature Display */}
        <View style={styles.temperatureSection}>
          <View style={styles.weatherIconContainer}>
            <Image
              source={{ uri: weatherService.getWeatherIconUrl(current.weather.icon) }}
              style={styles.weatherIcon}
            />
            <View style={styles.rainDrops}>
              {/* Add animated rain drops effect here if needed */}
            </View>
          </View>
          
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>{current.temp}°</Text>
            <Text style={styles.description}>{current.weather.description}</Text>
            <Text style={styles.feelsLike}>Feels like {current.feels_like}°</Text>
          </View>
        </View>
      </GlassCard>

      {/* Weather Details Grid */}
      <View style={styles.detailsGrid}>
        <GlassCard style={styles.detailCard}>
          <Ionicons name="water-outline" size={24} color={Colors.weather.cloudy} />
          <Text style={styles.detailValue}>{current.humidity}%</Text>
          <Text style={styles.detailLabel}>Humidity</Text>
        </GlassCard>
        
        <GlassCard style={styles.detailCard}>
          <Ionicons name="speedometer-outline" size={24} color={Colors.weather.cloudy} />
          <Text style={styles.detailValue}>{current.pressure}</Text>
          <Text style={styles.detailLabel}>hPa</Text>
        </GlassCard>
        
        <GlassCard style={styles.detailCard}>
          <Ionicons name="eye-outline" size={24} color={Colors.weather.cloudy} />
          <Text style={styles.detailValue}>{(current.visibility / 1000).toFixed(1)}</Text>
          <Text style={styles.detailLabel}>km</Text>
        </GlassCard>
        
        <GlassCard style={styles.detailCard}>
          <Ionicons name="flag-outline" size={24} color={Colors.weather.cloudy} />
          <Text style={styles.detailValue}>{current.wind_speed}</Text>
          <Text style={styles.detailLabel}>m/s</Text>
        </GlassCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  } as ViewStyle,
  mainCard: {
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.xl,
  } as ViewStyle,
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  } as ViewStyle,
  locationText: {
    ...Typography.location,
    textAlign: 'center',
    flex: 1,
  } as TextStyle,
  refreshButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  } as ViewStyle,
  temperatureSection: {
    alignItems: 'center',
  } as ViewStyle,
  weatherIconContainer: {
    position: 'relative',
    marginBottom: Spacing.lg,
  } as ViewStyle,
  weatherIcon: {
    width: 120,
    height: 120,
  } as ImageStyle,
  rainDrops: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  } as ViewStyle,
  temperatureContainer: {
    alignItems: 'center',
  } as ViewStyle,
  temperature: {
    ...Typography.temperature,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  } as TextStyle,
  description: {
    ...Typography.h2,
    textTransform: 'capitalize',
    marginTop: Spacing.sm,
    opacity: 0.9,
  } as TextStyle,
  feelsLike: {
    ...Typography.body,
    marginTop: Spacing.xs,
  } as TextStyle,
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  } as ViewStyle,
  detailCard: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  } as ViewStyle,
  detailValue: {
    ...Typography.h2,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  } as TextStyle,
  detailLabel: {
    ...Typography.caption,
  } as TextStyle,
});