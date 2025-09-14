import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { BorderRadius, createGlassEffect, Spacing } from '../constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  borderRadius?: number;
  padding?: number;
}

export function GlassCard({ 
  children, 
  style, 
  intensity = 20,
  borderRadius = BorderRadius.lg,
  padding = Spacing.md 
}: GlassCardProps) {
  return (
    <BlurView
      intensity={intensity}
      style={[
        styles.card,
        createGlassEffect(0.15),
        {
          borderRadius,
          padding,
        },
        style,
      ]}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});