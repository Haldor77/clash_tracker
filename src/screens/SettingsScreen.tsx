import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, Alert } from 'react-native';
import { useSettingsStore } from '../store/useSettingsStore';

const SettingsScreen: React.FC = () => {
  const { playerTags, clanTag, setPlayerTags, setClanTag } = useSettingsStore();
  const [tagsInput, setTagsInput] = useState<string>(playerTags.join(','));
  const [clanInput, setClanInput] = useState<string>(clanTag ?? '');

  const save = () => {
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toUpperCase())
      .filter(Boolean);
    setPlayerTags(tags);
    setClanTag(clanInput.trim().toUpperCase() || undefined);
    Alert.alert('Saved');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ marginBottom: 16 }}>
        <Text>Player Tags (comma separated)</Text>
        <TextInput
          accessibilityLabel="Player Tags"
          value={tagsInput}
          onChangeText={setTagsInput}
          autoCapitalize="characters"
          style={{ borderWidth: 1, padding: 8, marginTop: 4 }}
        />
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text>Clan Tag</Text>
        <TextInput
          accessibilityLabel="Clan Tag"
          value={clanInput}
          onChangeText={setClanInput}
          autoCapitalize="characters"
          style={{ borderWidth: 1, padding: 8, marginTop: 4 }}
        />
      </View>
      <Button title="Save" accessibilityLabel="Save settings" onPress={save} />
    </ScrollView>
  );
};

export default SettingsScreen;
