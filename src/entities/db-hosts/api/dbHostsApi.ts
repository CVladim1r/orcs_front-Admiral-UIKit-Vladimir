import { DbHostDto } from '@/shared/api/oraculus-api/OraculusApi';
import { oraculusApi } from '@/shared/api/oraculus-api';
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

export function mapHostUsers(dbHostsDto: DbHostDto[]): DbHost[] {
  return dbHostsDto;
}

export function useDbHosts() {
  return useQuery({
    queryKey: ['db-hosts'],
    queryFn: async () => {
      const response = await oraculusApi.getDbHosts();
      return mapHostUsers(response);
    },
  });
}
