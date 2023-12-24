import { oraculusApi } from '@/shared/api/oraculus-api';
import { VdbSnapshotDto } from '@/shared/api/oraculus-api/OraculusApi';
import { useQuery } from '@tanstack/react-query';

export interface VdbSnapshot {
  datecreated: string;
  id: string;
  sintname: string;
  sname: string;
  stype: number;
}

export function mapVdbSnapshots(vdbSnapshots: VdbSnapshotDto[]): VdbSnapshot[] {
  return vdbSnapshots;
}

export function useVdbSnapshots(vdbId: string) {
  return useQuery({
    queryKey: ['vdbs-snapshots', vdbId],
    queryFn: async () => {
      const response = await oraculusApi.getVdbSnapshotsByVdbId(vdbId);
      return mapVdbSnapshots(response);
    },
  });
}
