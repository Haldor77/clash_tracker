import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  label: string;
  value: string | number;
}

const StatCard: React.FC<Props> = ({ label, value }) => (
  <View style={{ padding: 12, borderWidth: 1, borderRadius: 8, margin: 4 }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{value}</Text>
    <Text style={{ fontSize: 12 }}>{label}</Text>
  </View>
);

export default StatCard;
