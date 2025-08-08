import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useSettingsStore } from '../store/useSettingsStore';
import { usePlayer } from '../hooks/useClash';
import ProgressRing from '../components/ProgressRing';
import StatCard from '../components/StatCard';

const DashboardScreen: React.FC = () => {
  const { playerTags } = useSettingsStore();
  const tag = playerTags[0];
  const { data, isLoading, isError } = usePlayer(tag);

  if (!tag) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Please add a player tag in settings.</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Failed to load player. Check the tag.</Text>
      </View>
    );
  }

  const heroes = data.heroes || [];
  const current = heroes.reduce((sum, h) => sum + h.level, 0);
  const max = heroes.reduce((sum, h) => sum + h.maxLevel, 0);
  const heroProgress = max ? current / max : 0;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{data.name}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 }}>
        <ProgressRing progress={data.townHallLevel / 16} label={`TH ${data.townHallLevel}`} />
        <ProgressRing
          progress={heroProgress}
          label={`${Math.round(heroProgress * 100)}% Heroes`}
        />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <StatCard label="Trophies" value={data.trophies} />
        {data.builderHallLevel ? (
          <StatCard label="BH" value={data.builderHallLevel} />
        ) : null}
        <StatCard label="Idle Builders" value="-" />
        <StatCard label="Lab Status" value="-" />
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
