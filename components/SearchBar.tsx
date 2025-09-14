import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useWeather } from '../contexts/WeatherContext';

interface SearchResult {
  name: string;
  country: string;
}

interface SearchBarProps {
  onCitySelect: (city: string) => void;
}

export function SearchBar({ onCitySelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { searchCities } = useWeather();

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      const searchResults = await searchCities(text);
      setResults(searchResults);
      setShowResults(true);
    } catch (error) {
      setResults([]);
    }
  };

  const handleSelectCity = (city: SearchResult) => {
    onCitySelect(city.name);
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Search for a city..."
          value={query}
          onChangeText={handleSearch}
          autoCapitalize="words"
        />
      </View>
      
      {showResults && (
        <FlatList
          data={results}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleSelectCity(item)}
            >
              <Text style={styles.cityName}>{item.name}, {item.country}</Text>
            </TouchableOpacity>
          )}
          style={styles.results}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  results: {
    maxHeight: 200,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cityName: {
    fontSize: 16,
    color: '#333',
  },
});