export interface Ship {
  position: { x: number; y: number };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

export interface ShipsData {
  gameId: string;
  ships: Ship[];
  indexPlayer: string;
}
