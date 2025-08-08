import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { UpgradeItem, Resource } from '../models/upgrades';

const items: UpgradeItem[] = [
  {
    id: '1',
    name: 'Archer Tower',
    current: 10,
    max: 12,
    nextCost: 1000000,
    timeHoursNext: 24,
    resource: Resource.Gold,
  },
  {
    id: '2',
    name: 'Barbarian King',
    current: 30,
    max: 80,
    nextCost: 150000,
    timeHoursNext: 18,
    resource: Resource.DarkElixir,
  },
];

const score = (item: UpgradeItem) => {
  const fraction = item.current / item.max;
  const time = Math.max(1, item.timeHoursNext);
  return (1 - fraction) / Math.pow(time, 0.3);
};

const PlannerScreen: React.FC = () => {
  const sorted = [...items].sort((a, b) => score(b) - score(a));
  return (
    <FlatList
      data={sorted}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          <Text>{item.current}/{item.max}</Text>
          <Text>Next: {item.nextCost} in {item.timeHoursNext}h</Text>
        </View>
      )}
    />
  );
};

export default PlannerScreen;
