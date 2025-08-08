import { api } from './client';
import { Player } from '../models/player';

export interface Clan {
  tag: string;
  name: string;
  members: number;
}

export async function fetchPlayer(tag: string): Promise<Player> {
  const { data } = await api.get<Player>(`/players/${encodeURIComponent(tag)}`);
  return data;
}

export async function fetchClan(tag: string): Promise<Clan> {
  const { data } = await api.get<Clan>(`/clans/${encodeURIComponent(tag)}`);
  return data;
}
