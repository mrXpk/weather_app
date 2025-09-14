import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { GradientBackground } from '../components/GradientBackground';
import { GlassCard } from '../components/GlassCard';
import { useWeather } from '../contexts/WeatherContext';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

interface SearchResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { searchCities, fetchWeatherByCity } = useWeather();

  const handleSearch = async (text: string) => {
    setQuery(text);
    
    if (text.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const searchResults = await searchCities(text);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectCity = async (city: SearchResult) => {
    await fetchWeatherByCity(city.name);
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Pick Location</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search Description */}
        <Text style={styles.description}>
          Find the area or the city that you want to know the detailed weather info at this time
        </Text>

        {/* Search Bar */}
        <GlassCard style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color={Colors.text.secondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={Colors.text.tertiary}
              value={query}
              onChangeText={handleSearch}
              autoCapitalize="words"
              autoCorrect={false}
            />
            <TouchableOpacity style={styles.locationButton}>
              <Ionicons name="location" size={20} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Search Results */}
        {query.length >= 2 && (
          <View style={styles.resultsContainer}>
            {isSearching ? (
              <Text style={styles.loadingText}>Searching...</Text>
            ) : (
              <FlatList
                data={results}
                keyExtractor={(item, index) => `${item.name}-${item.country}-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => handleSelectCity(item)}
                  >
                    <GlassCard style={styles.resultCard}>
                      <View style={styles.resultContent}>
                        <View style={styles.locationInfo}>
                          <Text style={styles.cityName}>{item.name}</Text>
                          <Text style={styles.countryName}>{item.country}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
                      </View>
                    </GlassCard>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        )}

        {query.length >= 2 && results.length === 0 && !isSearching && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No cities found</Text>
          </View>
        )}
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
  placeholder: {
    width: 40,
  },
  description: {
    ...Typography.body,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  searchCard: {
    marginBottom: Spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.text.primary,
  },
  locationButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  resultsContainer: {
    flex: 1,
  },
  loadingText: {
    ...Typography.body,
    textAlign: 'center',
    opacity: 0.7,
    marginTop: Spacing.xl,
  },
  resultItem: {
    marginBottom: Spacing.sm,
  },
  resultCard: {
    paddingVertical: Spacing.md,
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationInfo: {
    flex: 1,
  },
  cityName: {
    ...Typography.h3,
    marginBottom: 2,
  },
  countryName: {
    ...Typography.caption,
    opacity: 0.7,
  },
  noResults: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  noResultsText: {
    ...Typography.body,
    opacity: 0.7,
  },
});