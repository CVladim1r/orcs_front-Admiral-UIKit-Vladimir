import { oraculusApi } from '@/shared/api/oraculus-api';
import { VdbDto } from '@/shared/api/oraculus-api/OraculusApi';
import { useQuery } from '@tanstack/react-query';

export interface Vdb {
  dbport: number;
  dsid: string;
  hostid: string;
  id: string;
  snapid: string;
  vdbname: string;
  vdbpath: string;
}

export function mapVdbs(hostUserDto: VdbDto[]): Vdb[] {
  return hostUserDto;
}

export function useVdbs() {
  return useQuery({
    queryKey: ['vdbs'],
    queryFn: async () => {
      const response = await oraculusApi.getVdbs();
      return mapVdbs(response);
    },
  });
}
