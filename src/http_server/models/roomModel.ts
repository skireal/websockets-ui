export interface Room {
  roomId: string;
  roomUsers: Array<{ name: string; index: string }>;
}
