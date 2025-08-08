export interface Hero {
  name: string;
  level: number;
  maxLevel: number;
}

export interface Troop {
  name: string;
  level: number;
  maxLevel: number;
}

export interface Spell {
  name: string;
  level: number;
  maxLevel: number;
}

export interface Pet {
  name: string;
  level: number;
  maxLevel: number;
}

export interface Player {
  tag: string;
  name: string;
  townHallLevel: number;
  builderHallLevel?: number;
  trophies: number;
  heroes?: Hero[];
  troops?: Troop[];
  spells?: Spell[];
  pets?: Pet[];
}
