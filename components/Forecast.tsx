import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { ForecastDay } from '../types/weather';
import { weatherService } from '../services/weatherService';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

interface ForecastProps {
  data: ForecastDay[];
  compact?: boolean;
}

export function Forecast({ data, compact = false }: ForecastProps) {
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

  if (compact) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.compactContainer}>
          {data.map((day, index) => (
            <ForecastCard key={index} day={day} date={formatDate(day.date)} compact />
          ))}
        </View>
      </ScrollView>
    );
  }

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
  compact?: boolean;
}

function ForecastCard({ day, date, compact = false }: ForecastCardProps) {
  if (compact) {
    return (
      <View style={styles.compactCard}>
        <Text style={styles.compactDate}>{date}</Text>
        <Image
          source={{ uri: weatherService.getWeatherIconUrl(day.weather.icon) }}
          style={styles.compactIcon}
        />
        <View style={styles.compactTempContainer}>
          <Text style={styles.compactMaxTemp}>{Math.round(day.temp.max)}°</Text>
          <Text style={styles.compactMinTemp}>{Math.round(day.temp.min)}°</Text>
        </View>
      </View>
    );
  }

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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
  },
  compactContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  title: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  forecastContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  card: {
    width: 120,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  compactCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    minWidth: 60,
    marginHorizontal: 4,
  },
  date: {
    ...Typography.caption,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  compactDate: {
    ...Typography.caption,
    fontSize: 12,
    marginBottom: Spacing.xs,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: Spacing.sm,
  },
  compactIcon: {
    width: 32,
    height: 32,
    marginVertical: Spacing.xs,
  },
  condition: {
    ...Typography.caption,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  tempContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  compactTempContainer: {
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  maxTemp: {
    ...Typography.body,
    fontWeight: '600',
  },
  minTemp: {
    ...Typography.body,
    opacity: 0.7,
  },
  compactMaxTemp: {
    ...Typography.caption,
    fontWeight: '600',
    fontSize: 14,
  },
  compactMinTemp: {
    ...Typography.caption,
    opacity: 0.7,
    fontSize: 12,
  },
  details: {
    alignItems: 'center',
  },
  detailText: {
    ...Typography.caption,
    fontSize: 10,
    textAlign: 'center',
    opacity: 0.7,
  },
});