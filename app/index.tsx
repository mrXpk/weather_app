import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GradientBackground } from '../components/GradientBackground';
import { GlassCard } from '../components/GlassCard';
import { HourlyForecast } from '../components/HourlyForecast';
import { Forecast } from '../components/Forecast';
import { TabSwitcher } from '../components/TabSwitcher';
import { FloatingNavigation } from '../components/FloatingNavigation';
import { LoadingScreen, ErrorScreen } from '../components/LoadingAndError';
import { useWeather } from '../contexts/WeatherContext';
import { weatherService } from '../services/weatherService';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

const { height } = Dimensions.get('window');

export default function Index() {
  const {
    weatherData,
    isLoading,
    error,
    fetchWeatherByLocation,
    refreshWeather,
  } = useWeather();

  const [activeTab, setActiveTab] = useState<'hourly' | 'weekly'>('hourly');

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  // Generate mock hourly data (you can replace with real API data)
  const generateHourlyData = () => {
    if (!weatherData) return [];
    
    const hours = [];
    const now = new Date();
    
    for (let i = 0; i < 24; i++) {
      const time = new Date(now.getTime() + (i * 60 * 60 * 1000));
      const hour = time.getHours();
      const temp = weatherData.current.temp + Math.random() * 6 - 3; // Slight variation
      
      hours.push({
        time: i === 0 ? 'Now' : `${hour.toString().padStart(2, '0')}:00`,
        temp: Math.round(temp),
        icon: weatherData.current.weather.icon,
        isNow: i === 0,
      });
    }
    
    return hours;
  };

  const handleLocationPress = () => {
    // Refresh current location weather
    fetchWeatherByLocation();
  };

  const handleSearchPress = () => {
    router.push('/search');
  };

  const handleMenuPress = () => {
    router.push('/history');
  };

  if (isLoading && !weatherData) {
    return (
      <GradientBackground>
        <LoadingScreen />
      </GradientBackground>
    );
  }

  if (error && !weatherData) {
    return (
      <GradientBackground>
        <ErrorScreen
          message={error}
          onRetry={fetchWeatherByLocation}
        />
      </GradientBackground>
    );
  }

  if (!weatherData) {
    return (
      <GradientBackground>
        <LoadingScreen />
      </GradientBackground>
    );
  }

  const hourlyData = generateHourlyData();

  return (
    <GradientBackground weatherCondition={weatherData.current.weather.main}>
      <SafeAreaView style={styles.container}>
        {/* Top Section - Location & Temperature */}
        <View style={styles.topSection}>
          <Text style={styles.locationText}>
            {weatherData.location.name}, {weatherData.location.country}
          </Text>
          <Text style={styles.temperatureText}>
            {weatherData.current.temp}°
          </Text>
        </View>

        {/* Center Section - Weather Icon */}
        <View style={styles.centerSection}>
          <View style={styles.weatherIconContainer}>
            <Image
              source={{ uri: weatherService.getWeatherIconUrl(weatherData.current.weather.icon) }}
              style={styles.mainWeatherIcon}
            />
            {/* Cloud effect overlay */}
            <View style={styles.cloudOverlay} />
          </View>
          
          {/* Weather description */}
          <Text style={styles.descriptionText}>
            {weatherData.current.weather.description}
          </Text>
        </View>

        {/* Bottom Section - Forecast Card */}
        <View style={styles.bottomSection}>
          <GlassCard style={styles.forecastCard}>
            <TabSwitcher 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
            />
            
            {activeTab === 'hourly' ? (
              <HourlyForecast data={hourlyData} />
            ) : (
              <View style={styles.weeklyContainer}>
                <Forecast data={weatherData.forecast} compact />
              </View>
            )}
          </GlassCard>
        </View>

        {/* Floating Navigation */}
        <FloatingNavigation
          onLocationPress={handleLocationPress}
          onSearchPress={handleSearchPress}
          onMenuPress={handleMenuPress}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  locationText: {
    ...Typography.h2,
    fontWeight: '300',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  temperatureText: {
    fontSize: 80,
    fontWeight: '100',
    color: Colors.text.primary,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  weatherIconContainer: {
    position: 'relative',
    marginBottom: Spacing.lg,
  },
  mainWeatherIcon: {
    width: 160,
    height: 160,
  },
  cloudOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.round,
  },
  descriptionText: {
    ...Typography.h3,
    fontWeight: '300',
    textTransform: 'capitalize',
    opacity: 0.8,
  },
  bottomSection: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 120, // Space for floating navigation
  },
  forecastCard: {
    minHeight: 200,
    paddingVertical: Spacing.lg,
  },
  weeklyContainer: {
    maxHeight: 150,
  },
});