import { DataSetSnapshotDto } from '@/shared/api/oraculus-api/OraculusApi';
import { oraculusApi } from '@/shared/api/oraculus-api';
import { useQuery } from '@tanstack/react-query';

export interface Snapshot {
  dataset: string;
  datecreated: string;
  id: string;
  isexported: boolean;
  sintname: string;
  sname: string;
  sparent: string;
  stype: Stype;
}

export type Stype = 0 | 1 | 2 | 3;

export function mapSnapshotsDto(
  SnapshotsDto: DataSetSnapshotDto[],
): Snapshot[] {
  return SnapshotsDto;
}

export function useDataSetSnapshots(dataSetId?: string) {
  return useQuery({
    queryKey: ['snapshots', dataSetId],
    queryFn: async () => {
      const response = await oraculusApi.getSnapshotsByDataSetId(dataSetId!);

      return mapSnapshotsDto(response);
    },
    enabled: !!dataSetId,
  });
}
