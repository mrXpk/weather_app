import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { GradientBackground } from '../components/GradientBackground';
import { GlassCard } from '../components/GlassCard';
import { useWeather } from '../contexts/WeatherContext';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

// Mock history data - you can replace this with real data from AsyncStorage
const mockHistoryData = [
  { city: 'New York', country: 'US', temp: '22°', condition: 'Sunny', time: '2 hours ago' },
  { city: 'London', country: 'UK', temp: '15°', condition: 'Cloudy', time: '1 day ago' },
  { city: 'Tokyo', country: 'JP', temp: '28°', condition: 'Rainy', time: '2 days ago' },
  { city: 'Paris', country: 'FR', temp: '18°', condition: 'Partly Cloudy', time: '3 days ago' },
  { city: 'Sydney', country: 'AU', temp: '25°', condition: 'Clear', time: '1 week ago' },
];

export default function HistoryScreen() {
  const { fetchWeatherByCity } = useWeather();

  const handleBack = () => {
    router.back();
  };

  const handleSelectHistory = async (cityName: string) => {
    await fetchWeatherByCity(cityName);
    router.back();
  };

  const renderHistoryItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => handleSelectHistory(item.city)}
    >
      <GlassCard style={styles.historyCard}>
        <View style={styles.historyContent}>
          <View style={styles.leftSection}>
            <View style={styles.locationInfo}>
              <Text style={styles.cityName}>{item.city}</Text>
              <Text style={styles.countryName}>{item.country}</Text>
            </View>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          
          <View style={styles.rightSection}>
            <View style={styles.weatherInfo}>
              <Text style={styles.temperature}>{item.temp}</Text>
              <Text style={styles.condition}>{item.condition}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Search History</Text>
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Your recent weather searches
        </Text>

        {/* History List */}
        <View style={styles.historyContainer}>
          {mockHistoryData.length > 0 ? (
            <FlatList
              data={mockHistoryData}
              renderItem={renderHistoryItem}
              keyExtractor={(item, index) => `${item.city}-${index}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="time-outline" size={64} color={Colors.text.tertiary} />
              <Text style={styles.emptyTitle}>No Search History</Text>
              <Text style={styles.emptyDescription}>
                Start searching for cities to see your history here
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
  },
  backButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    ...Typography.h2,
    fontWeight: '600',
  },
  clearButton: {
    padding: Spacing.sm,
  },
  clearText: {
    ...Typography.body,
    color: Colors.accent,
    fontWeight: '500',
  },
  description: {
    ...Typography.body,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: Spacing.xl,
  },
  historyContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  historyItem: {
    marginBottom: Spacing.md,
  },
  historyCard: {
    paddingVertical: Spacing.lg,
  },
  historyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
  },
  locationInfo: {
    marginBottom: Spacing.xs,
  },
  cityName: {
    ...Typography.h3,
    marginBottom: 2,
  },
  countryName: {
    ...Typography.caption,
    opacity: 0.7,
  },
  timeText: {
    ...Typography.caption,
    opacity: 0.6,
    fontSize: 12,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  weatherInfo: {
    alignItems: 'flex-end',
  },
  temperature: {
    ...Typography.h2,
    fontWeight: '600',
  },
  condition: {
    ...Typography.caption,
    opacity: 0.7,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    ...Typography.h2,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyDescription: {
    ...Typography.body,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
  },
});