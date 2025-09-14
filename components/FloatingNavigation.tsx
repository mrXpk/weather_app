import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '../constants/theme';

interface FloatingNavigationProps {
  onLocationPress: () => void;
  onSearchPress: () => void;
  onMenuPress: () => void;
}

export function FloatingNavigation({ 
  onLocationPress, 
  onSearchPress, 
  onMenuPress 
}: FloatingNavigationProps) {
  return (
    <View style={styles.container}>
      {/* Left - Location */}
      <TouchableOpacity style={styles.sideButton} onPress={onLocationPress}>
        <Ionicons name="location" size={24} color={Colors.text.primary} />
      </TouchableOpacity>

      {/* Center - Add/Search */}
      <TouchableOpacity style={styles.centerButton} onPress={onSearchPress}>
        <Ionicons name="add" size={28} color={Colors.text.primary} />
      </TouchableOpacity>

      {/* Right - Menu */}
      <TouchableOpacity style={styles.sideButton} onPress={onMenuPress}>
        <Ionicons name="menu" size={24} color={Colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  sideButton: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.button,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.card,
    shadowColor: Colors.accent,
    shadowOpacity: 0.4,
    elevation: 10,
  },
});