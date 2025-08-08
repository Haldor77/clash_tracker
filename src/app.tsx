import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSettingsStore } from './store/useSettingsStore';
import DashboardScreen from './screens/DashboardScreen';
import PlannerScreen from './screens/PlannerScreen';
import SettingsScreen from './screens/SettingsScreen';
import { colors } from './theme/colors';
import { registerRefreshTask } from './lib/background';

const queryClient = new QueryClient();

type Tab = 'dashboard' | 'planner' | 'settings';

const App: React.FC = () => {
  const { playerTags, theme } = useSettingsStore();
  const [tab, setTab] = useState<Tab>(playerTags.length ? 'dashboard' : 'settings');

  useEffect(() => {
    registerRefreshTask().catch(() => {});
  }, []);

  const renderTab = () => {
    switch (tab) {
      case 'planner':
        return <PlannerScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors[theme].background }]}> 
        <View style={styles.content}>{renderTab()}</View>
        <View style={styles.tabBar} accessible accessibilityRole="tablist">
          <TouchableOpacity
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === 'dashboard' }}
            onPress={() => setTab('dashboard')}
            style={styles.tabButton}
          >
            <Text style={styles.tabText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === 'planner' }}
            onPress={() => setTab('planner')}
            style={styles.tabButton}
          >
            <Text style={styles.tabText}>Planner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === 'settings' }}
            onPress={() => setTab('settings')}
            style={styles.tabButton}
          >
            <Text style={styles.tabText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ccc'
  },
  tabButton: { flex: 1, padding: 12, alignItems: 'center' },
  tabText: { fontSize: 14 }
});

export default App;
