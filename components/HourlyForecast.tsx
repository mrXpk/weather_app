import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { weatherService } from '../services/weatherService';

interface HourlyForecastProps {
  data: Array<{
    time: string;
    temp: number;
    icon: string;
    isNow?: boolean;
  }>;
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {data.map((item, index) => (
        <View key={index} style={styles.hourItem}>
          <Text style={[styles.time, item.isNow && styles.nowText]}>
            {item.isNow ? 'Now' : item.time}
          </Text>
          <View style={styles.iconContainer}>
            <Image
              source={{ uri: weatherService.getWeatherIconUrl(item.icon) }}
              style={styles.weatherIcon}
            />
          </View>
          <Text style={styles.temperature}>{item.temp}°</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  hourItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    minWidth: 60,
    marginHorizontal: 4,
  },
  time: {
    ...Typography.caption,
    marginBottom: Spacing.xs,
  },
  nowText: {
    color: Colors.accent,
    fontWeight: '600',
  },
  iconContainer: {
    marginVertical: Spacing.xs,
  },
  weatherIcon: {
    width: 32,
    height: 32,
  },
  temperature: {
    ...Typography.body,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
});