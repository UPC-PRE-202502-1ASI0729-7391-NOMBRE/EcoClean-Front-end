export interface BinReport {
  id: number;
  message: string;
  photoUrl: string | null;
  smartBinId: number;
  reporterId: number;
  createdAt?: string;
}
