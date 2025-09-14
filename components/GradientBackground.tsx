import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  weatherCondition?: string;
}

export function GradientBackground({ 
  children, 
  style, 
  weatherCondition = 'default' 
}: GradientBackgroundProps) {
  // Dynamic gradients based on weather conditions
  const getGradientColors = (condition: string): readonly [string, string, ...string[]] => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return ['#1a1a2e', '#16213e', '#2d1b69'] as const;
      case 'clouds':
      case 'cloudy':
        return ['#0f0f0f', '#1a1a2e', '#16213e'] as const;
      case 'rain':
      case 'drizzle':
        return ['#16213e', '#1a1a2e', '#0f3460'] as const;
      case 'thunderstorm':
        return ['#0f0f0f', '#1a1a2e', '#2c1810'] as const;
      case 'snow':
        return ['#16213e', '#1a1a2e', '#2d3436'] as const;
      default:
        return [Colors.primary.start, Colors.primary.middle, Colors.primary.end] as const;
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors(weatherCondition)}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});