import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CurrentWeather } from '../components/CurrentWeather';
import { Forecast } from '../components/Forecast';
import { EmptyState, ErrorScreen, LoadingScreen } from '../components/LoadingAndError';
import { SearchBar } from '../components/SearchBar';
import { GradientBackground } from '../components/GradientBackground';
import { useWeather } from '../contexts/WeatherContext';

export default function Index() {
  const {
    weatherData,
    isLoading,
    error,
    fetchWeatherByLocation,
    fetchWeatherByCity,
    refreshWeather,
  } = useWeather();

  useEffect(() => {
    // Fetch weather data on app load
    fetchWeatherByLocation();
  }, []);

  const handleRefresh = async () => {
    await refreshWeather();
  };

  const handleCitySelect = async (city: string) => {
    await fetchWeatherByCity(city);
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
        <SafeAreaView style={styles.container}>
          <SearchBar onCitySelect={handleCitySelect} />
          <ErrorScreen
            message={error}
            onRetry={fetchWeatherByLocation}
          />
        </SafeAreaView>
      </GradientBackground>
    );
  }

  if (!weatherData) {
    return (
      <GradientBackground>
        <EmptyState
          title="No Weather Data"
          message="Unable to load weather information. Please check your internet connection and try again."
          actionText="Retry"
          onAction={fetchWeatherByLocation}
          icon="cloud-offline-outline"
        />
      </GradientBackground>
    );
  }

  return (
    <GradientBackground weatherCondition={weatherData.current.weather.main}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              colors={['#6c5ce7']}
              tintColor="#6c5ce7"
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <SearchBar onCitySelect={handleCitySelect} />
          
          {error && (
            <View style={styles.warningContainer}>
              <Text style={styles.warningText}>⚠️ {error}</Text>
            </View>
          )}
          
          <CurrentWeather
            data={weatherData}
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />
          
          {weatherData.forecast.length > 0 && (
            <Forecast data={weatherData.forecast} />
          )}

          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  bottomPadding: {
    height: 20,
  },
  warningContainer: {
    backgroundColor: 'rgba(255, 195, 113, 0.2)',
    borderColor: 'rgba(255, 195, 113, 0.4)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
  },
  warningText: {
    color: '#ffeaa7',
    fontSize: 14,
    textAlign: 'center',
  },
});