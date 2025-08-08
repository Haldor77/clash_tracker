export enum Resource {
  Gold = 'Gold',
  Elixir = 'Elixir',
  DarkElixir = 'DarkElixir',
}

export interface UpgradeItem {
  id: string;
  name: string;
  current: number;
  max: number;
  nextCost: number;
  timeHoursNext: number;
  resource: Resource;
}
