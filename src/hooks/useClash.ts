import { useQuery } from '@tanstack/react-query';
import { fetchPlayer } from '../api/clash';
import { Player } from '../models/player';

export const usePlayer = (tag?: string) =>
  useQuery<Player, Error>({
    queryKey: ['player', tag],
    queryFn: () => {
      if (!tag) throw new Error('Player tag required');
      return fetchPlayer(tag);
    },
    enabled: !!tag,
  });
