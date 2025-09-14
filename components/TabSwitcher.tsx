import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

interface TabSwitcherProps {
  activeTab: 'hourly' | 'weekly';
  onTabChange: (tab: 'hourly' | 'weekly') => void;
}

export function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'hourly' && styles.activeTab]}
        onPress={() => onTabChange('hourly')}
      >
        <Text style={[styles.tabText, activeTab === 'hourly' && styles.activeTabText]}>
          Hourly Forecast
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
        onPress={() => onTabChange('weekly')}
      >
        <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>
          Weekly Forecast
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.lg,
    padding: 4,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.accent,
  },
  tabText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.text.primary,
    fontWeight: '600',
  },
});