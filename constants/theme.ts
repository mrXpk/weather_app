import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

// Theme system inspired by the beautiful dark glassmorphism design
export const Colors = {
  // Main gradients (from the inspiration image)
  primary: {
    start: '#1a1a2e',    // Deep dark blue
    middle: '#16213e',   // Mid purple-blue
    end: '#0f0f0f',      // Almost black
  },
  
  // Glassmorphism card colors
  glass: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
  
  // Text colors
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.8)',
    tertiary: 'rgba(255, 255, 255, 0.6)',
  },
  
  // Weather-specific colors
  weather: {
    sunny: '#FFD700',
    cloudy: '#87CEEB',
    rainy: '#4682B4',
    stormy: '#696969',
    snowy: '#F8F8FF',
  },
  
  // UI Elements
  accent: '#6c5ce7',      // Purple accent
  success: '#00b894',
  warning: '#fdcb6e',
  error: '#e17055',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const BorderRadius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  round: 50,
};

export const Typography = {
  // Large temperature display
  temperature: {
    fontSize: 72,
    fontWeight: '200',
    color: Colors.text.primary,
  } as TextStyle,
  
  // Main headings
  h1: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.text.primary,
  } as TextStyle,
  
  // Section headings
  h2: {
    fontSize: 22,
    fontWeight: '500',
    color: Colors.text.primary,
  } as TextStyle,
  
  // Card titles
  h3: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text.primary,
  } as TextStyle,
  
  // Body text
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.text.secondary,
  } as TextStyle,
  
  // Small text
  caption: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.text.tertiary,
  } as TextStyle,
  
  // Location text
  location: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.text.primary,
  } as TextStyle,
};

export const Shadows = {
  card: {
    shadowColor: Colors.glass.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  
  button: {
    shadowColor: Colors.glass.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
};

// Glassmorphism effect helper
export const createGlassEffect = (opacity = 0.1) => ({
  backgroundColor: `rgba(255, 255, 255, ${opacity})`,
  borderWidth: 1,
  borderColor: Colors.glass.border,
  ...Shadows.card,
});

export default {
  Colors,
  Spacing,
  BorderRadius,
  Typography,
  Shadows,
  createGlassEffect,
};