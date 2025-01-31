import { Stack } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
  <Stack>

    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

  </Stack>

  );
}