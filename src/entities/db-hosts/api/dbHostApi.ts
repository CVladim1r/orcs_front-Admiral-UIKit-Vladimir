import { oraculusApi } from '@/shared/api/oraculus-api';
import { DbHostDto } from '@/shared/api/oraculus-api/OraculusApi';
import { useQuery } from '@tanstack/react-query';

export interface DbHost {
  db_os_user: string;
  db_path: string;
  db_port: number;
  db_type: string;
  host_desc?: string;
  host_name: string;
  host_user_id: string;
  id: string;
  is_virtual: boolean;
}

export function mapHostUser(dbHostDto: DbHostDto[]): DbHost {
  return dbHostDto[0];
}

export function useDbHostById(dbHostId: string) {
  return useQuery({
    queryKey: ['db-host', dbHostId],
    queryFn: async () => {
      const response = await oraculusApi.getDbHostById(dbHostId);
      return mapHostUser(response);
    },
  });
}
