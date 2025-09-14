import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, StatusBar, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CurrentWeather } from '../components/CurrentWeather';
import { Forecast } from '../components/Forecast';
import { EmptyState, ErrorScreen, LoadingScreen } from '../components/LoadingAndError';
import { SearchBar } from '../components/SearchBar';
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
    return <LoadingScreen />;
  }

  if (error && !weatherData) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
        <SearchBar onCitySelect={handleCitySelect} />
        <ErrorScreen
          message={error}
          onRetry={fetchWeatherByLocation}
        />
      </SafeAreaView>
    );
  }

  if (!weatherData) {
    return (
      <EmptyState
        title="No Weather Data"
        message="Unable to load weather information. Please check your internet connection and try again."
        actionText="Retry"
        onAction={fetchWeatherByLocation}
        icon="cloud-offline-outline"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            colors={['#4A90E2']}
            tintColor="#4A90E2"
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  bottomPadding: {
    height: 20,
  },
  warningContainer: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
  },
  warningText: {
    color: '#856404',
    fontSize: 14,
    textAlign: 'center',
  },
});
