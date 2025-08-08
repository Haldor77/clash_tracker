import * as Notifications from 'expo-notifications';

export async function ensurePermissions(): Promise<boolean> {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const res = await Notifications.requestPermissionsAsync();
    return res.status === 'granted';
  }
  return true;
}

export async function scheduleReminder(body: string, seconds: number) {
  const granted = await ensurePermissions();
  if (!granted) return;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Clash Progress',
      body,
    },
    trigger: { seconds },
  });
}
