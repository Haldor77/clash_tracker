import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

export const REFRESH_TASK = 'REFRESH_TASK';

TaskManager.defineTask(REFRESH_TASK, async () => {
  try {
    // TODO: Ping proxy to refresh Clash data cache
    return BackgroundFetch.Result.NewData;
  } catch {
    return BackgroundFetch.Result.Failed;
  }
});

export async function registerRefreshTask() {
  try {
    await BackgroundFetch.registerTaskAsync(REFRESH_TASK, {
      minimumInterval: 60 * 30,
      stopOnTerminate: false,
      startOnBoot: true,
    });
  } catch (e) {
    console.error('Failed to register background task', e);
  }
}
